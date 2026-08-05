import { DamageEntry, Player, Role } from "./types.js";

function clonePlayers(players: Player[]): Player[] {
  return players.map((p) => ({ ...p }));
}

function applyDamage(players: Player[], damageByTarget: Map<string, number>): {
  updatedPlayers: Player[];
  damageLog: DamageEntry[];
} {
  const updatedPlayers = clonePlayers(players);
  const damageLog: DamageEntry[] = [];
  for (const [targetId, damage] of damageByTarget) {
    const target = updatedPlayers.find((p) => p.id === targetId);
    if (!target || !target.alive) continue;
    target.hp -= damage;
    damageLog.push({ targetId, damage });
    if (target.hp <= 0) {
      target.hp = 0;
      target.alive = false;
    }
  }
  return { updatedPlayers, damageLog };
}

/**
 * 밤 페이즈 해석: 생존자의 지목을 대상별로 합산해 데미지로 적용한다.
 * (04핵심메커니즘.md: 같은 대상을 여러 명이 지목하면 공격자 수만큼 합산)
 */
export function resolveNightAttacks(
  players: Player[],
  targets: Record<string, string>,
): { updatedPlayers: Player[]; damageLog: DamageEntry[] } {
  const damageByTarget = new Map<string, number>();
  for (const [attackerId, targetId] of Object.entries(targets)) {
    const attacker = players.find((p) => p.id === attackerId);
    if (!attacker || !attacker.alive) continue;
    damageByTarget.set(targetId, (damageByTarget.get(targetId) ?? 0) + 1);
  }
  return applyDamage(players, damageByTarget);
}

/**
 * 낮 투표 해석: 최다득표자에게 고정 데미지 1. 동점이면 데미지 없이 동점자 목록만 반환한다
 * (03라운드진행.md: 동점자만 즉시 재투표).
 */
export function resolveDayVote(
  players: Player[],
  votes: Record<string, string>,
  voteDamage = 1,
): {
  updatedPlayers: Player[];
  damageLog: DamageEntry[];
  topTargetId: string | null;
  tiedTargetIds: string[];
} {
  const voteCounts = new Map<string, number>();
  for (const [voterId, targetId] of Object.entries(votes)) {
    const voter = players.find((p) => p.id === voterId);
    if (!voter || !voter.alive) continue;
    voteCounts.set(targetId, (voteCounts.get(targetId) ?? 0) + 1);
  }

  if (voteCounts.size === 0) {
    return { updatedPlayers: clonePlayers(players), damageLog: [], topTargetId: null, tiedTargetIds: [] };
  }

  const maxVotes = Math.max(...voteCounts.values());
  const tiedTargetIds = [...voteCounts.entries()]
    .filter(([, count]) => count === maxVotes)
    .map(([targetId]) => targetId);

  if (tiedTargetIds.length > 1) {
    return { updatedPlayers: clonePlayers(players), damageLog: [], topTargetId: null, tiedTargetIds };
  }

  const topTargetId = tiedTargetIds[0];
  const { updatedPlayers, damageLog } = applyDamage(
    players,
    new Map([[topTargetId, voteDamage]]),
  );
  return { updatedPlayers, damageLog, topTargetId, tiedTargetIds: [] };
}

/**
 * 승리조건 판정 (02역할.md 기준).
 * - 보스 사망 -> 스파이 즉시 승리
 * - 보스 생존 + 스파이/배신자 전멸 -> 보스(경호원 포함) 승리
 * - 생존자가 배신자 1명만 남음 -> 배신자 승리
 */
export function checkWinner(players: Player[]): Role | null {
  const boss = players.find((p) => p.role === "boss");
  if (!boss || !boss.alive) return "spy";

  const alive = players.filter((p) => p.alive);
  const spiesOrTraitorAlive = alive.some(
    (p) => p.role === "spy" || p.role === "traitor",
  );
  if (!spiesOrTraitorAlive) return "boss";

  if (alive.length === 1 && alive[0].role === "traitor") return "traitor";

  return null;
}
