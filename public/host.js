const socket = io();

const createSection = document.getElementById("createSection");
const lobbySection = document.getElementById("lobbySection");
const gameSection = document.getElementById("gameSection");
const overSection = document.getElementById("overSection");
const errorLabel = document.getElementById("errorLabel");

document.getElementById("createRoomBtn").addEventListener("click", () => {
  socket.emit("host:create_room", {}, (res) => {
    document.getElementById("roomCode").textContent = res.code;
    createSection.style.display = "none";
    lobbySection.style.display = "block";
  });
});

document.getElementById("startBtn").addEventListener("click", () => {
  socket.emit("host:start_game", {}, (res) => {
    if (res && !res.ok) errorLabel.textContent = res.error ?? "시작할 수 없습니다.";
  });
});

document.getElementById("advanceBtn").addEventListener("click", () => {
  socket.emit("host:advance_phase");
});

document.getElementById("extendBtn").addEventListener("click", () => {
  socket.emit("host:extend_phase", { extraMs: 60_000 });
});

function renderPlayerList(el, players, { showHp } = { showHp: false }) {
  el.innerHTML = "";
  for (const p of players) {
    const li = document.createElement("li");
    if (!p.alive) li.classList.add("dead");
    li.textContent = showHp ? `${p.nickname} (HP ${p.hp})` : p.nickname;
    el.appendChild(li);
  }
}

socket.on("state:players", ({ players }) => {
  renderPlayerList(document.getElementById("playerList"), players);
  renderPlayerList(document.getElementById("gamePlayerList"), players, { showHp: true });
  document.getElementById("startBtn").disabled = players.length !== 8;
  document.getElementById("startBtn").textContent =
    players.length === 8 ? "시작" : `시작 (${players.length}/8명)`;
});

socket.on("state:phase_changed", ({ phase, round, phaseEndsAt }) => {
  errorLabel.textContent = "";
  if (phase === "lobby") return;
  lobbySection.style.display = "none";
  if (phase === "game_over") {
    gameSection.style.display = "none";
    overSection.style.display = "block";
    return;
  }
  gameSection.style.display = "block";
  document.getElementById("phaseLabel").textContent = `${round}라운드 - ${PHASE_LABELS[phase]}`;
  startCountdown(phaseEndsAt, document.getElementById("timerLabel"));
  const advanceBtn = document.getElementById("advanceBtn");
  const extendBtn = document.getElementById("extendBtn");
  const hasTimer = phase === "night" || phase === "day_discussion" || phase === "day_vote";
  extendBtn.style.display = hasTimer ? "block" : "none";
  advanceBtn.textContent = phase === "day_reveal" ? "토론 시작하기" : "다음 단계로 (강제 진행)";
});

socket.on("state:game_over", ({ winner }) => {
  document.getElementById("winnerLabel").textContent = WINNER_LABELS[winner] ?? winner;
});
