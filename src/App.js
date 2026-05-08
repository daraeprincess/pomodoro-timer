import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

const DEFAULT_DURATIONS = { work: 25, shortBreak: 5, longBreak: 15 };
const LONG_BREAK_INTERVAL = 4;

function buildModes(durations) {
  return [
    { label: 'Work',        seconds: durations.work       * 60 },
    { label: 'Short Break', seconds: durations.shortBreak * 60 },
    { label: 'Long Break',  seconds: durations.longBreak  * 60 },
  ];
}

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function App() {
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  const modes = buildModes(durations);

  const [modeIndex, setModeIndex] = useState(0);
  const [timeLeft, setTimeLeft]   = useState(modes[0].seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [cycle, setCycle]         = useState(1);
  const intervalRef               = useRef(null);

  const currentMode = modes[modeIndex];

  const clearTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const handleModeChange = useCallback((index) => {
    clearTimer();
    setIsRunning(false);
    setModeIndex(index);
    setTimeLeft(modes[index].seconds);
  }, [clearTimer, modes]);

  const handleReset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(currentMode.seconds);
  }, [clearTimer, currentMode.seconds]);

  const handleSettingsSave = useCallback((newDurations) => {
    const newModes = buildModes(newDurations);
    setDurations(newDurations);
    clearTimer();
    setIsRunning(false);
    setModeIndex(0);
    setTimeLeft(newModes[0].seconds);
  }, [clearTimer]);

  const handleSessionEnd = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    if (modeIndex === 0) {
      const newCompleted = completed + 1;
      setCompleted(newCompleted);
      if (newCompleted % LONG_BREAK_INTERVAL === 0) {
        setCycle(1);
        handleModeChange(2);
      } else {
        setCycle((c) => c + 1);
        handleModeChange(1);
      }
    } else {
      handleModeChange(0);
    }
  }, [modeIndex, completed, clearTimer, handleModeChange]);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isRunning, handleSessionEnd, clearTimer]);

  useEffect(() => {
    document.title = `${formatTime(timeLeft)} — ${currentMode.label}`;
  }, [timeLeft, currentMode.label]);

  const statusText = isRunning
    ? (modeIndex === 0 ? '집중 중...' : '휴식 중...')
    : (timeLeft === currentMode.seconds ? 'Ready to focus' : '일시정지');

  return (
    <div className="App">
      <div className="app-shell">
        <Header />
        <Body
          modes={modes}
          modeIndex={modeIndex}
          timeLeft={formatTime(timeLeft)}
          isRunning={isRunning}
          completed={completed}
          cycle={cycle}
          longBreakInterval={LONG_BREAK_INTERVAL}
          statusText={statusText}
          durations={durations}
          onModeChange={handleModeChange}
          onToggle={() => setIsRunning((r) => !r)}
          onReset={handleReset}
          onSettingsSave={handleSettingsSave}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;