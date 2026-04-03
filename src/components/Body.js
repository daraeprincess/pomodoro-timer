function Body() {
    return (
        <main className="timer-body">
          <section className="timer-card">
            <div className="timer-mode">
              <button className="mode-button active">Work</button>
              <button className="mode-button">Short Break</button>
              <button className="mode-button">Long Break</button>
            </div>

            <div className="timer-display">
              <span className="timer-value">25:00</span>
              <p className="timer-status">Ready to focus</p>
            </div>

            <div className="timer-actions">
              <button className="action-button primary">Start</button>
              <button className="action-button secondary">Reset</button>
            </div>

            <div className="session-summary">
              <div>
                <p className="summary-label">Completed</p>
                <p className="summary-value">0</p>
              </div>
              <div>
                <p className="summary-label">Current Cycle</p>
                <p className="summary-value">1 / 4</p>
              </div>
            </div>
          </section>

          <section className="goal-card">
            <h2>오늘의 목표</h2>
            <p>집중 시간 25분+휴식 시간 5분</p>
          </section>
        </main>
    );
}

export default Body;