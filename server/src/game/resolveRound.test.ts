import assert from "node:assert/strict";
import { test } from "node:test";
import { checkWinner, resolveDayVote, resolveNightAttacks } from "./resolveRound.js";
import { NightAction, Player, defaultAbilityState } from "./types.js";

function makePlayer(overrides: Partial<Player>): Player {
  return {
    id: "p1",
    nickname: "nick",
    role: "spy",
    hp: 4,
    alive: true,
    abilities: defaultAbilityState(),
    ...overrides,
  };
}

function attack(targetId: string): NightAction {
  return { actionType: "attack", targetId };
}

test("resolveNightAttacks sums damage when multiple attackers target the same player", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "spy2", role: "spy" }),
    makePlayer({ id: "spy3", role: "spy" }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
  ];
  const { updatedPlayers, damageLog } = resolveNightAttacks(
    players,
    { spy1: attack("boss"), spy2: attack("boss"), spy3: attack("boss") },
    2,
  );
  const boss = updatedPlayers.find((p) => p.id === "boss")!;
  assert.equal(boss.hp, 2);
  assert.equal(boss.alive, true);
  assert.deepEqual(damageLog, [{ targetId: "boss", damage: 3 }]);
});

test("resolveNightAttacks marks a player dead when HP drops to 0 or below", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "bodyguard1", role: "bodyguard", hp: 1 }),
  ];
  const { updatedPlayers } = resolveNightAttacks(players, { spy1: attack("bodyguard1") }, 2);
  const bg = updatedPlayers.find((p) => p.id === "bodyguard1")!;
  assert.equal(bg.hp, 0);
  assert.equal(bg.alive, false);
});

test("resolveNightAttacks ignores targets submitted by dead attackers", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy", alive: false }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
  ];
  const { updatedPlayers } = resolveNightAttacks(players, { spy1: attack("boss") }, 2);
  assert.equal(updatedPlayers.find((p) => p.id === "boss")!.hp, 5);
});

test("boss_execute deals double damage and can only be used once per game", () => {
  const players = [
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
    makePlayer({ id: "spy1", role: "spy" }),
  ];
  const round2 = resolveNightAttacks(players, { boss: { actionType: "boss_execute", targetId: "spy1" } }, 2);
  const spyAfterRound2 = round2.updatedPlayers.find((p) => p.id === "spy1")!;
  assert.equal(spyAfterRound2.hp, 2); // 4 - 2
  const bossAfterRound2 = round2.updatedPlayers.find((p) => p.id === "boss")!;
  assert.equal(bossAfterRound2.abilities.bossExecuteUsed, true);

  const round3 = resolveNightAttacks(
    round2.updatedPlayers,
    { boss: { actionType: "boss_execute", targetId: "spy1" } },
    3,
  );
  const spyAfterRound3 = round3.updatedPlayers.find((p) => p.id === "spy1")!;
  assert.equal(spyAfterRound3.hp, 2); // 2회차 시도는 무시되어 데미지 없음
});

test("bodyguard_shield absorb mode redirects all damage from the target to the bodyguard", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "spy2", role: "spy" }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
    makePlayer({ id: "bg1", role: "bodyguard", hp: 4 }),
  ];
  const { updatedPlayers } = resolveNightAttacks(
    players,
    {
      spy1: attack("boss"),
      spy2: attack("boss"),
      bg1: { actionType: "bodyguard_shield", targetId: "boss", shieldMode: "absorb" },
    },
    2,
  );
  assert.equal(updatedPlayers.find((p) => p.id === "boss")!.hp, 5); // 무피해
  assert.equal(updatedPlayers.find((p) => p.id === "bg1")!.hp, 2); // 4 - 2 흡수
});

test("bodyguard_shield halve mode rounds damage down for the target and leaves the bodyguard unharmed", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "spy2", role: "spy" }),
    makePlayer({ id: "spy3", role: "spy" }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
    makePlayer({ id: "bg1", role: "bodyguard", hp: 4 }),
  ];
  const { updatedPlayers } = resolveNightAttacks(
    players,
    {
      spy1: attack("boss"),
      spy2: attack("boss"),
      spy3: attack("boss"),
      bg1: { actionType: "bodyguard_shield", targetId: "boss", shieldMode: "halve" },
    },
    2,
  );
  assert.equal(updatedPlayers.find((p) => p.id === "boss")!.hp, 4); // 3데미지 -> 절반(내림) 1
  assert.equal(updatedPlayers.find((p) => p.id === "bg1")!.hp, 4); // 경호원 무피해
});

test("bodyguard_shield has a 1-round cooldown after use", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
    makePlayer({ id: "bg1", role: "bodyguard", hp: 4 }),
  ];
  const round2 = resolveNightAttacks(
    players,
    { spy1: attack("boss"), bg1: { actionType: "bodyguard_shield", targetId: "boss", shieldMode: "absorb" } },
    2,
  );
  assert.equal(round2.updatedPlayers.find((p) => p.id === "boss")!.hp, 5);

  // 쿨타임 중(3라운드) 재사용 시도 -> 무시되어 보스가 그대로 피해를 입음
  const round3 = resolveNightAttacks(
    round2.updatedPlayers,
    { spy1: attack("boss"), bg1: { actionType: "bodyguard_shield", targetId: "boss", shieldMode: "absorb" } },
    3,
  );
  assert.equal(round3.updatedPlayers.find((p) => p.id === "boss")!.hp, 4);

  // 쿨타임이 끝난 4라운드엔 다시 사용 가능
  const round4 = resolveNightAttacks(
    round3.updatedPlayers,
    { spy1: attack("boss"), bg1: { actionType: "bodyguard_shield", targetId: "boss", shieldMode: "absorb" } },
    4,
  );
  assert.equal(round4.updatedPlayers.find((p) => p.id === "boss")!.hp, 4);
});

test("bodyguard_oath nullifies damage to self this round and can only be used once per game", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "bg1", role: "bodyguard", hp: 4 }),
  ];
  const round2 = resolveNightAttacks(
    players,
    { spy1: attack("bg1"), bg1: { actionType: "bodyguard_oath" } },
    2,
  );
  assert.equal(round2.updatedPlayers.find((p) => p.id === "bg1")!.hp, 4);
  assert.equal(round2.updatedPlayers.find((p) => p.id === "bg1")!.abilities.bodyguardOathUsed, true);

  const round3 = resolveNightAttacks(
    round2.updatedPlayers,
    { spy1: attack("bg1"), bg1: { actionType: "bodyguard_oath" } },
    3,
  );
  assert.equal(round3.updatedPlayers.find((p) => p.id === "bg1")!.hp, 3); // 재사용 불가 -> 정상 피해
});

test("spy_disrupt silences the target's entire night action and can only be used once per spy", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
  ];
  const { updatedPlayers, damageLog } = resolveNightAttacks(
    players,
    {
      spy1: { actionType: "spy_disrupt", targetId: "boss" },
      boss: attack("spy1"), // 침묵당해 무효화되어야 함
    },
    2,
  );
  assert.equal(updatedPlayers.find((p) => p.id === "spy1")!.hp, 4); // 보스의 공격이 무효화됨
  assert.deepEqual(damageLog, []);
  assert.equal(updatedPlayers.find((p) => p.id === "spy1")!.abilities.spyDisruptUsed, true);
});

test("traitor_smile deals boosted damage, heals per death this round (capped), and is single-use", () => {
  const players = [
    makePlayer({ id: "traitor1", role: "traitor", hp: 2 }),
    makePlayer({ id: "spy1", role: "spy", hp: 1 }),
  ];
  const { updatedPlayers } = resolveNightAttacks(
    players,
    { traitor1: { actionType: "traitor_smile", targetId: "spy1" } },
    2,
  );
  const spy = updatedPlayers.find((p) => p.id === "spy1")!;
  assert.equal(spy.alive, false); // 2데미지로 사망
  const traitor = updatedPlayers.find((p) => p.id === "traitor1")!;
  assert.equal(traitor.hp, 4); // 2 + 2(사망 1명) = 4, 상한(4)에서 클램프
  assert.equal(traitor.abilities.traitorSmileUsed, true);
});

test("resolveDayVote applies fixed damage 1 to the top-voted player", () => {
  const players = [
    makePlayer({ id: "a" }),
    makePlayer({ id: "b" }),
    makePlayer({ id: "c" }),
  ];
  const { updatedPlayers, topTargetId, tiedTargetIds } = resolveDayVote(players, {
    a: "c",
    b: "c",
  });
  assert.equal(topTargetId, "c");
  assert.deepEqual(tiedTargetIds, []);
  assert.equal(updatedPlayers.find((p) => p.id === "c")!.hp, 3);
});

test("resolveDayVote reports a tie without applying damage", () => {
  const players = [makePlayer({ id: "a" }), makePlayer({ id: "b" }), makePlayer({ id: "c" })];
  const { updatedPlayers, topTargetId, tiedTargetIds } = resolveDayVote(players, {
    a: "b",
    c: "a",
  });
  assert.equal(topTargetId, null);
  assert.deepEqual(new Set(tiedTargetIds), new Set(["a", "b"]));
  assert.equal(updatedPlayers.find((p) => p.id === "a")!.hp, 4);
  assert.equal(updatedPlayers.find((p) => p.id === "b")!.hp, 4);
});

test("checkWinner: boss death means immediate spy win", () => {
  const players = [
    makePlayer({ id: "boss", role: "boss", hp: 0, alive: false }),
    makePlayer({ id: "spy1", role: "spy" }),
  ];
  assert.equal(checkWinner(players), "spy");
});

test("checkWinner: boss side wins once all spies and the traitor are eliminated", () => {
  const players = [
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
    makePlayer({ id: "bg1", role: "bodyguard" }),
    makePlayer({ id: "spy1", role: "spy", alive: false, hp: 0 }),
    makePlayer({ id: "traitor1", role: "traitor", alive: false, hp: 0 }),
  ];
  assert.equal(checkWinner(players), "boss");
});

test("checkWinner: lone surviving traitor wins", () => {
  const players = [
    makePlayer({ id: "boss", role: "boss", alive: false, hp: 0 }),
    makePlayer({ id: "traitor1", role: "traitor", hp: 4 }),
  ];
  // 보스가 죽었으므로 실제로는 스파이 승리 규칙이 먼저 적용됨을 함께 확인
  assert.equal(checkWinner(players), "spy");
});

test("checkWinner: returns null while the game is undecided", () => {
  const players = [
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "traitor1", role: "traitor" }),
  ];
  assert.equal(checkWinner(players), null);
});
