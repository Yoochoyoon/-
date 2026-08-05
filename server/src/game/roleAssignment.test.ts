import assert from "node:assert/strict";
import { test } from "node:test";
import { assignRoles } from "./roleAssignment.js";
import { Role } from "./types.js";

function makePlayers(count: number): { id: string; nickname: string }[] {
  return Array.from({ length: count }, (_, i) => ({ id: `p${i}`, nickname: `n${i}` }));
}

function countRoles(players: { role: Role | null }[]): Record<Role, number> {
  const counts: Record<Role, number> = { boss: 0, bodyguard: 0, spy: 0, traitor: 0 };
  for (const p of players) {
    if (p.role) counts[p.role] += 1;
  }
  return counts;
}

const expectedByCount: Record<number, Record<Role, number>> = {
  6: { boss: 1, bodyguard: 2, spy: 2, traitor: 1 },
  7: { boss: 1, bodyguard: 2, spy: 3, traitor: 1 },
  8: { boss: 1, bodyguard: 3, spy: 3, traitor: 1 },
  9: { boss: 1, bodyguard: 3, spy: 4, traitor: 1 },
  10: { boss: 1, bodyguard: 4, spy: 4, traitor: 1 },
};

for (const count of [6, 7, 8, 9, 10]) {
  test(`assignRoles produces the 05인원세션타겟층.md role table for ${count} players`, () => {
    const players = assignRoles(makePlayers(count));
    assert.equal(players.length, count);
    assert.deepEqual(countRoles(players), expectedByCount[count]);
    for (const p of players) {
      assert.ok(p.role, "every player must be assigned a role");
      assert.equal(p.alive, true);
    }
  });
}

test("assignRoles rejects fewer than 6 players", () => {
  assert.throws(() => assignRoles(makePlayers(5)), /6~10/);
});

test("assignRoles rejects more than 10 players", () => {
  assert.throws(() => assignRoles(makePlayers(11)), /6~10/);
});
