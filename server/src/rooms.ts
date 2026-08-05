import { Room } from "./game/types.js";

const rooms = new Map<string, Room>();

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 헷갈리는 0/O, 1/I 제외

function generateRoomCode(): string {
  let code: string;
  do {
    code = Array.from({ length: 4 }, () =>
      CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
    ).join("");
  } while (rooms.has(code));
  return code;
}

export function createRoom(hostId: string): Room {
  const code = generateRoomCode();
  const room: Room = {
    code,
    hostId,
    players: [],
    round: 0,
    phase: "lobby",
    nightTargets: {},
    dayVotes: {},
    lastNightDamage: [],
    lastVoteResult: null,
    voteAllowedTargetIds: null,
    voteIsRevote: false,
    winner: null,
    phaseEndsAt: null,
    phaseTimer: null,
  };
  rooms.set(code, room);
  return room;
}

export function getRoom(code: string): Room | undefined {
  return rooms.get(code.toUpperCase());
}

export function deleteRoom(code: string): void {
  const room = rooms.get(code);
  if (room?.phaseTimer) clearTimeout(room.phaseTimer);
  rooms.delete(code);
}
