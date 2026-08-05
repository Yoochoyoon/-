const socket = io();
let players = [];

document.getElementById("joinBtn").addEventListener("click", () => {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  socket.emit("viewer:join_room", { code }, (res) => {
    if (!res.ok) {
      alert(res.error);
      return;
    }
    document.getElementById("joinBar").style.display = "none";
    document.getElementById("roomCodeLabel").textContent = `방 코드: ${code}`;
  });
});

socket.on("state:players", (payload) => {
  players = payload.players;
  renderGrid();
});

socket.on("public:boss_revealed", ({ nickname }) => {
  document.getElementById("bossBanner").style.display = "block";
  document.getElementById("bossName").textContent = nickname;
});

socket.on("state:phase_changed", ({ phase, round, phaseEndsAt }) => {
  document.getElementById("winnerLabel").style.display = "none";
  if (phase === "lobby") {
    document.getElementById("phaseLabel").textContent = "플레이어 입장 대기 중";
    document.getElementById("timerLabel").textContent = "";
    return;
  }
  if (phase === "game_over") {
    document.getElementById("phaseLabel").textContent = "게임 종료";
    document.getElementById("timerLabel").textContent = "";
    return;
  }
  document.getElementById("phaseLabel").textContent = `${round}라운드 - ${PHASE_LABELS[phase]}`;
  startCountdown(phaseEndsAt, document.getElementById("timerLabel"));
  if (phase === "night" || phase === "day_discussion") {
    document.getElementById("resultLog").textContent = "";
  }
});

socket.on("state:night_result", ({ damageLog }) => showResult("🌙 밤 결과", damageLog));
socket.on("state:vote_result", ({ damageLog, tie, finalTie }) =>
  showResult("🗳 투표 결과", damageLog, tie ? (finalTie ? "동점 - 데미지 없음" : "동점 - 재투표") : undefined),
);

function showResult(title, damageLog, note) {
  const nameOf = (id) => players.find((p) => p.id === id)?.nickname ?? "???";
  const lines = damageLog.map((d) => `${nameOf(d.targetId)} -${d.damage}`);
  document.getElementById("resultLog").innerHTML =
    `<strong>${title}</strong><br>` + (lines.join("<br>") || note || "이번엔 아무 일도 없었습니다.");
}

socket.on("state:game_over", ({ winner }) => {
  const label = document.getElementById("winnerLabel");
  label.style.display = "block";
  label.textContent = WINNER_LABELS[winner] ?? winner;
});

function renderGrid() {
  const grid = document.getElementById("playerGrid");
  grid.innerHTML = "";
  for (const p of players) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<div>${p.nickname}${p.alive ? "" : " (사망)"}</div><div class="hp-bar"><div style="width:${Math.max(0, (p.hp / 5) * 100)}%"></div></div>`;
    grid.appendChild(div);
  }
}
