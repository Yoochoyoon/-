const PHASE_LABELS = {
  lobby: "대기실",
  night: "🌙 밤 - 대상 지목",
  day_reveal: "☀ 결과 공개",
  day_discussion: "💬 토론",
  day_vote: "🗳 투표",
  game_over: "게임 종료",
};

const WINNER_LABELS = {
  boss: "보스 & 경호원 승리",
  spy: "스파이 승리",
  traitor: "배신자 승리",
};

function formatTimer(ms) {
  if (ms == null) return "--:--";
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function startCountdown(phaseEndsAt, el) {
  if (window.__countdownTimer) clearInterval(window.__countdownTimer);
  if (!phaseEndsAt) {
    el.textContent = "--:--";
    return;
  }
  const tick = () => {
    el.textContent = formatTimer(phaseEndsAt - Date.now());
  };
  tick();
  window.__countdownTimer = setInterval(tick, 250);
}
