const socket = io();

let myId = null;
let myRole = null;
let players = [];
let currentPhase = "lobby";
let voteAllowedTargetIds = null;
let selectedTargetId = null;

const joinSection = document.getElementById("joinSection");
const waitingSection = document.getElementById("waitingSection");
const bossBanner = document.getElementById("bossBanner");
const roleCard = document.getElementById("roleCard");
const gameSection = document.getElementById("gameSection");
const resultSection = document.getElementById("resultSection");
const overSection = document.getElementById("overSection");
const errorLabel = document.getElementById("errorLabel");

socket.on("connect", () => {
  myId = socket.id;
});

document.getElementById("joinBtn").addEventListener("click", () => {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  const nickname = document.getElementById("nicknameInput").value.trim();
  socket.emit("player:join_room", { code, nickname }, (res) => {
    if (!res.ok) {
      errorLabel.textContent = res.error;
      return;
    }
    errorLabel.textContent = "";
    joinSection.style.display = "none";
    waitingSection.style.display = "block";
  });
});

socket.on("state:players", (payload) => {
  players = payload.players;
  if (currentPhase === "night" || currentPhase === "day_vote") renderTargetList();
});

socket.on("public:boss_revealed", ({ nickname }) => {
  bossBanner.style.display = "block";
  document.getElementById("bossName").textContent = nickname;
});

socket.on("player:role_assigned", ({ role, hp }) => {
  myRole = role;
  const roleNames = { boss: "보스", bodyguard: "경호원", spy: "스파이", traitor: "배신자" };
  document.getElementById("roleName").textContent = roleNames[role] ?? role;
  document.getElementById("hpLabel").textContent = `HP ${hp}`;
  document.getElementById("hpBarFill").style.width = "100%";
  roleCard.style.display = "block";
  waitingSection.style.display = "none";
});

socket.on("state:phase_changed", ({ phase, phaseEndsAt }) => {
  currentPhase = phase;
  selectedTargetId = null;
  resultSection.style.display = "none";

  const myself = players.find((p) => p.id === myId);
  if (myself) {
    document.getElementById("hpLabel").textContent = `HP ${myself.hp}${myself.alive ? "" : " (사망)"}`;
    document.getElementById("hpBarFill").style.width = `${Math.max(0, (myself.hp / 5) * 100)}%`;
  }

  if (phase === "game_over") {
    gameSection.style.display = "none";
    overSection.style.display = "block";
    const roleNames = { boss: "보스", bodyguard: "경호원", spy: "스파이", traitor: "배신자" };
    document.getElementById("myRoleReveal").textContent = `내 역할은 ${roleNames[myRole] ?? myRole}이었습니다.`;
    return;
  }

  gameSection.style.display = "block";
  document.getElementById("phaseLabel").textContent = PHASE_LABELS[phase];
  startCountdown(phaseEndsAt, document.getElementById("timerLabel"));

  const instructionLabel = document.getElementById("instructionLabel");
  const submitBtn = document.getElementById("submitBtn");

  if (phase === "night") {
    instructionLabel.textContent = "공격할 대상을 지목하세요.";
    submitBtn.style.display = "block";
    renderTargetList();
  } else if (phase === "day_vote") {
    voteAllowedTargetIds = null; // 서버가 별도로 알려주지 않는 한 전원 대상
    instructionLabel.textContent = "투표할 대상을 지목하세요.";
    submitBtn.style.display = "block";
    renderTargetList();
  } else if (phase === "day_reveal") {
    instructionLabel.textContent = "밤 사이 벌어진 일이 공개됩니다. 진행자가 토론을 시작할 때까지 기다려주세요.";
    submitBtn.style.display = "none";
    document.getElementById("targetList").innerHTML = "";
  } else if (phase === "day_discussion") {
    instructionLabel.textContent = "자유롭게 토론하세요.";
    submitBtn.style.display = "none";
    document.getElementById("targetList").innerHTML = "";
  }
});

socket.on("state:night_result", ({ damageLog }) => {
  showResult("🌙 밤 결과", damageLog);
});

socket.on("state:vote_result", ({ damageLog, tie, tiedTargetIds, finalTie }) => {
  if (tie) {
    voteAllowedTargetIds = tiedTargetIds ?? null;
    showResult("🗳 투표 결과", [], finalTie ? "동점으로 이번 라운드는 데미지 없이 종료됩니다." : "동점! 동점자 중에서 재투표합니다.");
  } else {
    showResult("🗳 투표 결과", damageLog);
  }
});

function showResult(title, damageLog, note) {
  resultSection.style.display = "block";
  const el = document.getElementById("resultLog");
  const nameOf = (id) => players.find((p) => p.id === id)?.nickname ?? "???";
  const lines = damageLog.map((d) => `${nameOf(d.targetId)} 이(가) 데미지 ${d.damage}를 입었습니다.`);
  el.innerHTML = `<strong>${title}</strong><br>` + (lines.join("<br>") || note || "이번엔 아무 일도 없었습니다.");
}

function renderTargetList() {
  const el = document.getElementById("targetList");
  el.innerHTML = "";
  const myself = players.find((p) => p.id === myId);
  const targetable = players.filter((p) => {
    if (p.id === myId) return false;
    if (!p.alive) return false;
    if (voteAllowedTargetIds && !voteAllowedTargetIds.includes(p.id)) return false;
    return true;
  });
  for (const p of targetable) {
    const li = document.createElement("li");
    li.textContent = p.nickname;
    if (p.id === selectedTargetId) li.classList.add("selected");
    li.addEventListener("click", () => {
      selectedTargetId = p.id;
      renderTargetList();
    });
    el.appendChild(li);
  }
  if (myself && !myself.alive) {
    el.innerHTML = "<li>사망 - 관전 중입니다.</li>";
    document.getElementById("submitBtn").style.display = "none";
  }
}

document.getElementById("submitBtn").addEventListener("click", () => {
  if (!selectedTargetId) return;
  const event = currentPhase === "night" ? "player:submit_night_target" : "player:submit_vote";
  socket.emit(event, { targetId: selectedTargetId });
  document.getElementById("instructionLabel").textContent = "지목 완료! 다른 사람들을 기다리는 중...";
});
