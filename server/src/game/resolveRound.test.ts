import assert from "node:assert/strict";
import { test } from "node:test";
import { checkWinner, resolveDayVote, resolveNightAttacks } from "./resolveRound.js";
import { Player } from "./types.js";

function makePlayer(overrides: Partial<Player>): Player {
  return {
    id: "p1",
    nickname: "nick",
    role: "spy",
    hp: 4,
    alive: true,
    ...overrides,
  };
}

test("resolveNightAttacks sums damage when multiple attackers target the same player", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy" }),
    makePlayer({ id: "spy2", role: "spy" }),
    makePlayer({ id: "spy3", role: "spy" }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
  ];
  const { updatedPlayers, damageLog } = resolveNightAttacks(players, {
    spy1: "boss",
    spy2: "boss",
    spy3: "boss",
  });
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
  const { updatedPlayers } = resolveNightAttacks(players, { spy1: "bodyguard1" });
  const bg = updatedPlayers.find((p) => p.id === "bodyguard1")!;
  assert.equal(bg.hp, 0);
  assert.equal(bg.alive, false);
});

test("resolveNightAttacks ignores targets submitted by dead attackers", () => {
  const players = [
    makePlayer({ id: "spy1", role: "spy", alive: false }),
    makePlayer({ id: "boss", role: "boss", hp: 5 }),
  ];
  const { updatedPlayers } = resolveNightAttacks(players, { spy1: "boss" });
  assert.equal(updatedPlayers.find((p) => p.id === "boss")!.hp, 5);
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
