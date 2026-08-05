export type Role = "boss" | "bodyguard" | "spy" | "traitor";

export type Phase =
  | "lobby"
  | "night"
  | "day_reveal"
  | "day_discussion"
  | "day_vote"
  | "game_over";

export type NightActionType =
  | "attack"
  | "boss_execute"
  | "bodyguard_shield"
  | "bodyguard_oath"
  | "spy_disrupt"
  | "traitor_smile";

export type ShieldMode = "absorb" | "halve";

export interface NightAction {
  actionType: NightActionType;
  targetId?: string;
  shieldMode?: ShieldMode;
}

export interface PlayerAbilityState {
  bossExecuteUsed: boolean;
  bodyguardOathUsed: boolean;
  bodyguardShieldLastUsedRound: number | null;
  spyDisruptUsed: boolean;
  traitorSmileUsed: boolean;
}

export function defaultAbilityState(): PlayerAbilityState {
  return {
    bossExecuteUsed: false,
    bodyguardOathUsed: false,
    bodyguardShieldLastUsedRound: null,
    spyDisruptUsed: false,
    traitorSmileUsed: false,
  };
}

export interface Player {
  id: string;
  nickname: string;
  role: Role | null;
  hp: number;
  alive: boolean;
  abilities: PlayerAbilityState;
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
  nightActions: Record<string, NightAction>;
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

export const MIN_PLAYERS = 6;
export const MAX_PLAYERS = 10;

export const ROLE_COMPOSITIONS: Record<number, Role[]> = {
  6: ["boss", "bodyguard", "bodyguard", "spy", "spy", "traitor"],
  7: ["boss", "bodyguard", "bodyguard", "spy", "spy", "spy", "traitor"],
  8: ["boss", "bodyguard", "bodyguard", "bodyguard", "spy", "spy", "spy", "traitor"],
  9: ["boss", "bodyguard", "bodyguard", "bodyguard", "spy", "spy", "spy", "spy", "traitor"],
  10: [
    "boss",
    "bodyguard",
    "bodyguard",
    "bodyguard",
    "bodyguard",
    "spy",
    "spy",
    "spy",
    "spy",
    "traitor",
  ],
};

export const PHASE_DURATIONS_MS: Partial<Record<Phase, number>> = {
  night: 2 * 60 * 1000,
  day_discussion: 5 * 60 * 1000,
  day_vote: 2 * 60 * 1000,
};
