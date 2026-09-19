import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, TimerStatus, TimerSettings, SoundSettings, NotificationSettings } from '../types';
import { MODE_CONFIG, STORAGE_KEYS } from '../constants/defaults';
import { formatTime } from '../utils/time';
import { playAlarmSound, playTickingSound } from '../utils/sound';
import { sendTimerNotification } from '../utils/notifications';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface UsePomodoroTimerOptions {
  timerSettings: TimerSettings;
  soundSettings: SoundSettings;
  notificationSettings: NotificationSettings;
  onFocusComplete?: (durationMinutes: number) => void;
  onBreakComplete?: (mode: 'shortBreak' | 'longBreak', durationMinutes: number) => void;
}

interface PersistedTimerState {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  totalDuration: number;
  targetEndTime: number | null;
}

export function usePomodoroTimer({
  timerSettings,
  soundSettings,
  notificationSettings,
  onFocusComplete,
  onBreakComplete,
}: UsePomodoroTimerOptions) {
  const getDurationForMode = useCallback(
    (m: TimerMode): number => {
      switch (m) {
        case 'focus':
          return timerSettings.focusDuration * 60;
        case 'shortBreak':
          return timerSettings.shortBreakDuration * 60;
        case 'longBreak':
          return timerSettings.longBreakDuration * 60;
      }
    },
    [timerSettings]
  );

  const initialTimerState = useRef(() => {
    const saved = loadFromStorage<PersistedTimerState | null>(STORAGE_KEYS.TIMER_STATE, null);
    if (saved) {
      if (saved.status === 'running' && saved.targetEndTime) {
        const remaining = Math.max(0, Math.ceil((saved.targetEndTime - Date.now()) / 1000));
        if (remaining > 0) {
          return {
            mode: saved.mode,
            status: 'running' as TimerStatus,
            timeLeft: remaining,
            totalDuration: saved.totalDuration || remaining,
            targetEndTime: saved.targetEndTime,
          };
        }
      } else if (saved.status === 'paused') {
        return {
          mode: saved.mode,
          status: 'paused' as TimerStatus,
          timeLeft: saved.timeLeft,
          totalDuration: saved.totalDuration,
          targetEndTime: null,
        };
      }
    }
    return null;
  }).current();

  const [mode, setMode] = useState<TimerMode>(() => initialTimerState?.mode ?? 'focus');
  const [status, setStatus] = useState<TimerStatus>(() => initialTimerState?.status ?? 'idle');
  
  // Persisted cycle count (0 to sessionsBeforeLongBreak - 1)
  const [completedInCycle, setCompletedInCycle] = useState<number>(() => {
    return loadFromStorage<number>(STORAGE_KEYS.CURRENT_CYCLE, 0);
  });

  const [totalDuration, setTotalDuration] = useState<number>(
    () => initialTimerState?.totalDuration ?? getDurationForMode(initialTimerState?.mode ?? 'focus')
  );
  const [timeLeft, setTimeLeft] = useState<number>(
    () => initialTimerState?.timeLeft ?? getDurationForMode(initialTimerState?.mode ?? 'focus')
  );

  // Target timestamp in ms when the session will complete
  const targetEndTimeRef = useRef<number | null>(initialTimerState?.targetEndTime ?? null);
  const lastTickSecondRef = useRef<number>(-1);

  // Sync active timer state to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TIMER_STATE, {
      mode,
      status,
      timeLeft,
      totalDuration,
      targetEndTime: targetEndTimeRef.current,
    });
  }, [mode, status, timeLeft, totalDuration]);

  // Sync cycle to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENT_CYCLE, completedInCycle);
  }, [completedInCycle]);

  // When timer settings change and timer is idle, update duration
  useEffect(() => {
    if (status === 'idle') {
      const newDuration = getDurationForMode(mode);
      setTotalDuration(newDuration);
      setTimeLeft(newDuration);
    }
  }, [timerSettings, mode, status, getDurationForMode]);

  // Handle document title updates
  useEffect(() => {
    if (status === 'running' || status === 'paused') {
      const statusIcon = status === 'paused' ? '⏸ ' : '';
      document.title = `${statusIcon}(${formatTime(timeLeft)}) ${MODE_CONFIG[mode].shortLabel} | Pomodoro Timer`;
    } else {
      document.title = 'Pomodoro Timer – Free Online Focus Timer';
    }
  }, [timeLeft, mode, status]);

  // Transition to next session
  const completeCurrentSession = useCallback(() => {
    const finishedMode = mode;
    const sessionDurationMinutes = Math.round(totalDuration / 60);

    // Audio alert
    if (soundSettings.soundEnabled) {
      playAlarmSound(soundSettings.alarmSound, soundSettings.alarmVolume);
    }

    // Notification alert
    if (notificationSettings.notificationsEnabled) {
      const title =
        finishedMode === 'focus'
          ? '🎯 Focus Session Complete!'
          : '☕ Break Finished!';
      const body =
        finishedMode === 'focus'
          ? 'Great job staying focused. Take a well-deserved break!'
          : 'Ready to dive back into deep focus?';
      sendTimerNotification(title, body);
    }

    let nextMode: TimerMode = 'focus';
    let shouldAutoStart = false;

    if (finishedMode === 'focus') {
      onFocusComplete?.(sessionDurationMinutes);
      const nextCycleCount = completedInCycle + 1;

      if (nextCycleCount >= timerSettings.sessionsBeforeLongBreak) {
        nextMode = 'longBreak';
        setCompletedInCycle(0);
      } else {
        nextMode = 'shortBreak';
        setCompletedInCycle(nextCycleCount);
      }
      shouldAutoStart = timerSettings.autoStartBreaks;
    } else {
      onBreakComplete?.(finishedMode, sessionDurationMinutes);
      nextMode = 'focus';
      shouldAutoStart = timerSettings.autoStartPomodoros;
    }

    // Set new mode and time
    setMode(nextMode);
    const nextDuration = getDurationForMode(nextMode);
    setTotalDuration(nextDuration);
    setTimeLeft(nextDuration);

    if (shouldAutoStart) {
      setStatus('running');
      targetEndTimeRef.current = Date.now() + nextDuration * 1000;
    } else {
      setStatus('idle');
      targetEndTimeRef.current = null;
    }
  }, [
    mode,
    totalDuration,
    soundSettings,
    notificationSettings,
    completedInCycle,
    timerSettings,
    getDurationForMode,
    onFocusComplete,
    onBreakComplete,
  ]);

  // Precision interval tick
  useEffect(() => {
    if (status !== 'running') {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (!targetEndTimeRef.current) return;

      const now = Date.now();
      const diffMs = targetEndTimeRef.current - now;
      const remainingSec = Math.max(0, Math.ceil(diffMs / 1000));

      setTimeLeft(remainingSec);

      // Ticking sound
      if (soundSettings.soundEnabled && soundSettings.tickingEnabled) {
        if (remainingSec !== lastTickSecondRef.current) {
          lastTickSecondRef.current = remainingSec;
          playTickingSound(soundSettings.tickingVolume);
        }
      }

      if (remainingSec <= 0) {
        clearInterval(intervalId);
        completeCurrentSession();
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [status, soundSettings, completeCurrentSession]);

  // Tab visibility change handler to prevent throttle drift
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && status === 'running' && targetEndTimeRef.current) {
        const remainingSec = Math.max(0, Math.ceil((targetEndTimeRef.current - Date.now()) / 1000));
        setTimeLeft(remainingSec);
        if (remainingSec <= 0) {
          completeCurrentSession();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [status, completeCurrentSession]);

  // Controls
  const startTimer = useCallback(() => {
    const now = Date.now();
    targetEndTimeRef.current = now + timeLeft * 1000;
    setStatus('running');
  }, [timeLeft]);

  const pauseTimer = useCallback(() => {
    if (targetEndTimeRef.current) {
      const remainingSec = Math.max(0, Math.ceil((targetEndTimeRef.current - Date.now()) / 1000));
      setTimeLeft(remainingSec);
    }
    targetEndTimeRef.current = null;
    setStatus('paused');
  }, []);

  const resetTimer = useCallback(() => {
    targetEndTimeRef.current = null;
    setStatus('idle');
    const defaultSec = getDurationForMode(mode);
    setTotalDuration(defaultSec);
    setTimeLeft(defaultSec);
  }, [getDurationForMode, mode]);

  const skipSession = useCallback(() => {
    targetEndTimeRef.current = null;
    let nextMode: TimerMode = 'focus';

    if (mode === 'focus') {
      const nextCycleCount = completedInCycle + 1;
      if (nextCycleCount >= timerSettings.sessionsBeforeLongBreak) {
        nextMode = 'longBreak';
        setCompletedInCycle(0);
      } else {
        nextMode = 'shortBreak';
        setCompletedInCycle(nextCycleCount);
      }
    } else {
      nextMode = 'focus';
    }

    setMode(nextMode);
    setStatus('idle');
    const nextDuration = getDurationForMode(nextMode);
    setTotalDuration(nextDuration);
    setTimeLeft(nextDuration);
  }, [mode, completedInCycle, timerSettings.sessionsBeforeLongBreak, getDurationForMode]);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      if (newMode === mode && status === 'idle') return;
      targetEndTimeRef.current = null;
      setMode(newMode);
      setStatus('idle');
      const dur = getDurationForMode(newMode);
      setTotalDuration(dur);
      setTimeLeft(dur);
    },
    [mode, status, getDurationForMode]
  );

  const toggleStartPause = useCallback(() => {
    if (status === 'running') {
      pauseTimer();
    } else {
      startTimer();
    }
  }, [status, pauseTimer, startTimer]);

  const progress = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;

  return {
    mode,
    status,
    timeLeft,
    totalDuration,
    progress,
    completedInCycle,
    sessionsBeforeLongBreak: timerSettings.sessionsBeforeLongBreak,
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    switchMode,
    toggleStartPause,
  };
}
