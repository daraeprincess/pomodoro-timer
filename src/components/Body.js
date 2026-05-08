import { useState } from 'react';

function Body({
  modes,
  modeIndex,
  timeLeft,
  isRunning,
  completed,
  cycle,
  longBreakInterval,
  statusText,
  durations,
  onModeChange,
  onToggle,
  onReset,
  onSettingsSave,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState(durations);

  function handleOpen() {
    setDraft(durations);
    setShowSettings(true);
  }

  function handleChange(field, value) {
    const num = Math.max(1, Math.min(99, Number(value)));
    setDraft((prev) => ({ ...prev, [field]: num }));
  }

  function handleSave() {
    onSettingsSave(draft);
    setShowSettings(false);
  }

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

        <button className="settings-button" onClick={handleOpen}>
          ⚙ 시간 설정
        </button>
      </section>

      {showSettings && (
        <div className="settings-overlay" onClick={() => setShowSettings(false)}>
          <section className="settings-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="settings-title">타이머 시간 설정 (분)</h3>
            <div className="settings-fields">
              <label className="settings-label">
                집중 시간
                <input
                  type="number"
                  className="settings-input"
                  min={1}
                  max={99}
                  value={draft.work}
                  onChange={(e) => handleChange('work', e.target.value)}
                />
              </label>
              <label className="settings-label">
                짧은 휴식
                <input
                  type="number"
                  className="settings-input"
                  min={1}
                  max={99}
                  value={draft.shortBreak}
                  onChange={(e) => handleChange('shortBreak', e.target.value)}
                />
              </label>
              <label className="settings-label">
                긴 휴식
                <input
                  type="number"
                  className="settings-input"
                  min={1}
                  max={99}
                  value={draft.longBreak}
                  onChange={(e) => handleChange('longBreak', e.target.value)}
                />
              </label>
            </div>
            <div className="settings-actions">
              <button className="action-button primary" onClick={handleSave}>
                저장
              </button>
              <button className="action-button secondary" onClick={() => setShowSettings(false)}>
                취소
              </button>
            </div>
          </section>
        </div>
      )}

      <section className="goal-card">
        <h2>오늘의 목표</h2>
        <p>집중 시간 {durations.work}분 + 휴식 {durations.shortBreak}분 루틴으로 하루를 효율적으로 마무리하세요.</p>
      </section>
    </main>
  );
}

export default Body;