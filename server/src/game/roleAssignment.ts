import { MAX_HP, Player, ROLE_COMPOSITION } from "./types.js";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function assignRoles(
  players: { id: string; nickname: string }[],
): Player[] {
  if (players.length !== ROLE_COMPOSITION.length) {
    throw new Error(
      `MVP는 ${ROLE_COMPOSITION.length}명 고정입니다 (현재 ${players.length}명)`,
    );
  }
  const roles = shuffle(ROLE_COMPOSITION);
  return players.map((player, index) => {
    const role = roles[index];
    return {
      id: player.id,
      nickname: player.nickname,
      role,
      hp: MAX_HP[role],
      alive: true,
    };
  });
}
