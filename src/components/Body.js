function Body({
  modes,
  modeIndex,
  timeLeft,
  isRunning,
  completed,
  cycle,
  longBreakInterval,
  statusText,
  onModeChange,
  onToggle,
  onReset,
}) {
  return (
    <main className="timer-body">
      <section className="timer-card">
        <div className="timer-mode">
          {modes.map((m, i) => (
            <button
              key={m.label}
              className={`mode-button${modeIndex === i ? ' active' : ''}`}
              onClick={() => onModeChange(i)}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="timer-display">
          <span className="timer-value">{timeLeft}</span>
          <p className="timer-status">{statusText}</p>
        </div>

        <div className="timer-actions">
          <button className="action-button primary" onClick={onToggle}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button className="action-button secondary" onClick={onReset}>
            Reset
          </button>
        </div>

        <div className="session-summary">
          <div>
            <p className="summary-label">Completed</p>
            <p className="summary-value">{completed}</p>
          </div>
          <div>
            <p className="summary-label">Current Cycle</p>
            <p className="summary-value">{cycle} / {longBreakInterval}</p>
          </div>
        </div>
      </section>

      <section className="goal-card">
        <h2>오늘의 목표</h2>
        <p>집중 시간 25분 + 휴식 5분 루틴으로 하루를 효율적으로 마무리하세요.</p>
      </section>
    </main>
  );
}

export default Body;