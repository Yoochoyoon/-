export type Role = "boss" | "bodyguard" | "spy" | "traitor";

export type Phase =
  | "lobby"
  | "night"
  | "day_reveal"
  | "day_discussion"
  | "day_vote"
  | "game_over";

export interface Player {
  id: string;
  nickname: string;
  role: Role | null;
  hp: number;
  alive: boolean;
}

export interface DamageEntry {
  targetId: string;
  damage: number;
}

export interface Room {
  code: string;
  hostId: string;
  players: Player[];
  round: number;
  phase: Phase;
  nightTargets: Record<string, string>;
  dayVotes: Record<string, string>;
  lastNightDamage: DamageEntry[];
  lastVoteResult: { targetId: string | null; tie: boolean } | null;
  voteAllowedTargetIds: string[] | null;
  voteIsRevote: boolean;
  winner: Role | null;
  phaseEndsAt: number | null;
  phaseTimer: NodeJS.Timeout | null;
}

export const MAX_HP: Record<Role, number> = {
  boss: 5,
  bodyguard: 4,
  spy: 4,
  traitor: 4,
};

export const ROLE_COMPOSITION: Role[] = [
  "boss",
  "bodyguard",
  "bodyguard",
  "bodyguard",
  "spy",
  "spy",
  "spy",
  "traitor",
];

export const PHASE_DURATIONS_MS: Partial<Record<Phase, number>> = {
  night: 2 * 60 * 1000,
  day_discussion: 5 * 60 * 1000,
  day_vote: 2 * 60 * 1000,
};
