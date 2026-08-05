import type { Server, Socket } from "socket.io";
import { assignRoles } from "./game/roleAssignment.js";
import { checkWinner, resolveDayVote, resolveNightAttacks } from "./game/resolveRound.js";
import { PHASE_DURATIONS_MS, Phase, Role, Room, ROLE_COMPOSITION } from "./game/types.js";
import { createRoom, deleteRoom, getRoom } from "./rooms.js";

const ROOM_SIZE = ROLE_COMPOSITION.length;

interface SocketData {
  roomCode?: string;
  isHost?: boolean;
}

function publicPlayers(room: Room) {
  return room.players.map((p) => ({
    id: p.id,
    nickname: p.nickname,
    hp: p.hp,
    alive: p.alive,
  }));
}

function emitState(io: Server, room: Room) {
  // player.js re-derives its own HP from the players array on phase_changed,
  // so state:players must arrive first or it reads the stale pre-round-start snapshot.
  io.to(room.code).emit("state:players", { players: publicPlayers(room) });
  io.to(room.code).emit("state:phase_changed", {
    phase: room.phase,
    round: room.round,
    phaseEndsAt: room.phaseEndsAt,
  });
}

function clearPhaseTimer(room: Room) {
  if (room.phaseTimer) {
    clearTimeout(room.phaseTimer);
    room.phaseTimer = null;
  }
}

function scheduleTimedPhase(io: Server, room: Room, phase: Phase, onExpire: () => void) {
  const duration = PHASE_DURATIONS_MS[phase];
  room.phase = phase;
  room.phaseEndsAt = duration ? Date.now() + duration : null;
  clearPhaseTimer(room);
  if (duration) {
    room.phaseTimer = setTimeout(() => {
      onExpire();
    }, duration);
  }
  emitState(io, room);
}

function endGame(io: Server, room: Room, winner: Role) {
  clearPhaseTimer(room);
  room.phase = "game_over";
  room.winner = winner;
  room.phaseEndsAt = null;
  io.to(room.code).emit("state:game_over", { winner, players: publicPlayers(room) });
  emitState(io, room);
}

function startNightPhase(io: Server, room: Room) {
  room.nightTargets = {};
  scheduleTimedPhase(io, room, "night", () => resolveNight(io, room));
}

function resolveNight(io: Server, room: Room) {
  const { updatedPlayers, damageLog } = resolveNightAttacks(room.players, room.nightTargets);
  room.players = updatedPlayers;
  room.lastNightDamage = damageLog;

  const winner = checkWinner(room.players);
  if (winner) {
    endGame(io, room, winner);
    return;
  }

  clearPhaseTimer(room);
  room.phase = "day_reveal";
  room.phaseEndsAt = null;
  io.to(room.code).emit("state:night_result", {
    damageLog,
    players: publicPlayers(room),
  });
  emitState(io, room);
}

function startDiscussionPhase(io: Server, room: Room) {
  scheduleTimedPhase(io, room, "day_discussion", () => startVotePhase(io, room));
}

function startVotePhase(io: Server, room: Room) {
  room.dayVotes = {};
  scheduleTimedPhase(io, room, "day_vote", () => resolveVote(io, room));
}

function resolveVote(io: Server, room: Room) {
  const { updatedPlayers, damageLog, topTargetId, tiedTargetIds } = resolveDayVote(
    room.players,
    room.dayVotes,
  );

  if (tiedTargetIds.length > 1) {
    if (room.voteIsRevote) {
      // 재투표도 동점: 데미지 없이 다음 라운드로
      room.voteIsRevote = false;
      room.voteAllowedTargetIds = null;
      room.lastVoteResult = { targetId: null, tie: true };
      io.to(room.code).emit("state:vote_result", {
        damageLog: [],
        topTargetId: null,
        tie: true,
        finalTie: true,
        players: publicPlayers(room),
      });
      advanceToNextRound(io, room);
      return;
    }
    room.voteIsRevote = true;
    room.voteAllowedTargetIds = tiedTargetIds;
    io.to(room.code).emit("state:vote_result", {
      damageLog: [],
      topTargetId: null,
      tie: true,
      finalTie: false,
      tiedTargetIds,
      players: publicPlayers(room),
    });
    startVotePhase(io, room);
    return;
  }

  room.players = updatedPlayers;
  room.voteIsRevote = false;
  room.voteAllowedTargetIds = null;
  room.lastVoteResult = { targetId: topTargetId, tie: false };
  io.to(room.code).emit("state:vote_result", {
    damageLog,
    topTargetId,
    tie: false,
    players: publicPlayers(room),
  });

  const winner = checkWinner(room.players);
  if (winner) {
    endGame(io, room, winner);
    return;
  }
  advanceToNextRound(io, room);
}

function advanceToNextRound(io: Server, room: Room) {
  room.round += 1;
  startNightPhase(io, room);
}

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    const data = socket.data as SocketData;

    socket.on("host:create_room", (_payload, callback: (res: { code: string }) => void) => {
      const room = createRoom(socket.id);
      data.roomCode = room.code;
      data.isHost = true;
      socket.join(room.code);
      callback({ code: room.code });
      emitState(io, room);
    });

    socket.on(
      "viewer:join_room",
      (payload: { code: string }, callback: (res: { ok: boolean; error?: string }) => void) => {
        const room = getRoom(payload.code ?? "");
        if (!room) return callback({ ok: false, error: "존재하지 않는 방 코드입니다." });
        data.roomCode = room.code;
        socket.join(room.code);
        callback({ ok: true });
        emitState(io, room);
      },
    );

    socket.on(
      "player:join_room",
      (
        payload: { code: string; nickname: string },
        callback: (res: { ok: boolean; error?: string; playerId?: string }) => void,
      ) => {
        const room = getRoom(payload.code ?? "");
        if (!room) return callback({ ok: false, error: "존재하지 않는 방 코드입니다." });
        if (room.phase !== "lobby") return callback({ ok: false, error: "이미 시작된 게임입니다." });
        if (room.players.length >= ROOM_SIZE) return callback({ ok: false, error: "방이 가득 찼습니다 (8명)." });
        const nickname = (payload.nickname ?? "").trim();
        if (!nickname) return callback({ ok: false, error: "닉네임을 입력해주세요." });
        if (room.players.some((p) => p.nickname === nickname)) {
          return callback({ ok: false, error: "이미 사용 중인 닉네임입니다." });
        }

        room.players.push({ id: socket.id, nickname, role: null, hp: 0, alive: true });
        data.roomCode = room.code;
        socket.join(room.code);
        callback({ ok: true, playerId: socket.id });
        emitState(io, room);
      },
    );

    socket.on(
      "host:start_game",
      (_payload, callback?: (res: { ok: boolean; error?: string }) => void) => {
        const room = data.roomCode ? getRoom(data.roomCode) : undefined;
        if (!room || !data.isHost) return callback?.({ ok: false, error: "진행자만 시작할 수 있습니다." });
        if (room.players.length !== ROOM_SIZE) {
          return callback?.({ ok: false, error: `${ROOM_SIZE}명이 모여야 시작할 수 있습니다.` });
        }
        room.players = assignRoles(room.players);
        room.round = 1;

        for (const player of room.players) {
          io.to(player.id).emit("player:role_assigned", { role: player.role, hp: player.hp });
        }
        const boss = room.players.find((p) => p.role === "boss");
        io.to(room.code).emit("public:boss_revealed", { nickname: boss?.nickname });

        startNightPhase(io, room);
        callback?.({ ok: true });
      },
    );

    socket.on("player:submit_night_target", (payload: { targetId: string }) => {
      const room = data.roomCode ? getRoom(data.roomCode) : undefined;
      if (!room || room.phase !== "night") return;
      const player = room.players.find((p) => p.id === socket.id);
      if (!player || !player.alive) return;
      room.nightTargets[socket.id] = payload.targetId;
    });

    socket.on("player:submit_vote", (payload: { targetId: string }) => {
      const room = data.roomCode ? getRoom(data.roomCode) : undefined;
      if (!room || room.phase !== "day_vote") return;
      const player = room.players.find((p) => p.id === socket.id);
      if (!player || !player.alive) return;
      if (room.voteAllowedTargetIds && !room.voteAllowedTargetIds.includes(payload.targetId)) return;
      room.dayVotes[socket.id] = payload.targetId;
    });

    socket.on("host:advance_phase", () => {
      const room = data.roomCode ? getRoom(data.roomCode) : undefined;
      if (!room || !data.isHost) return;
      if (room.phase === "night") resolveNight(io, room);
      else if (room.phase === "day_reveal") startDiscussionPhase(io, room);
      else if (room.phase === "day_discussion") startVotePhase(io, room);
      else if (room.phase === "day_vote") resolveVote(io, room);
    });

    socket.on("host:extend_phase", (payload: { extraMs?: number }) => {
      const room = data.roomCode ? getRoom(data.roomCode) : undefined;
      if (!room || !data.isHost || !room.phaseEndsAt) return;
      const extra = payload.extraMs ?? 60_000;
      room.phaseEndsAt += extra;
      clearPhaseTimer(room);
      const remaining = room.phaseEndsAt - Date.now();
      const phase = room.phase;
      room.phaseTimer = setTimeout(() => {
        if (phase === "night") resolveNight(io, room);
        else if (phase === "day_discussion") startVotePhase(io, room);
        else if (phase === "day_vote") resolveVote(io, room);
      }, Math.max(remaining, 0));
      emitState(io, room);
    });

    socket.on("disconnect", () => {
      const room = data.roomCode ? getRoom(data.roomCode) : undefined;
      if (!room) return;
      if (data.isHost && room.players.length === 0) {
        deleteRoom(room.code);
        return;
      }
      // MVP: 재접속 지원 없음. 연결이 끊긴 플레이어는 그대로 두고 게임은 계속 진행한다.
    });
  });
}
