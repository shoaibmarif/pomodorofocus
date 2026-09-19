import React from 'react';
import { TimerMode, TimerStatus, Task } from '../../types';
import { MODE_CONFIG } from '../../constants/defaults';
import { formatTime } from '../../utils/time';
import { ProgressRing } from './ProgressRing';
import { SessionDots } from './SessionDots';
import { TimerControls } from './TimerControls';
import { ActiveTaskBadge } from './ActiveTaskBadge';

interface TimerDisplayProps {
  mode: TimerMode;
  status: TimerStatus;
  timeLeft: number;
  progress: number;
  completedInCycle: number;
  sessionsBeforeLongBreak: number;
  activeTask: Task | null;
  soundEnabled: boolean;
  onSwitchMode: (mode: TimerMode) => void;
  onToggleStartPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSelectTasksTab: () => void;
  onToggleTaskComplete: (taskId: string) => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  mode,
  status,
  timeLeft,
  progress,
  completedInCycle,
  sessionsBeforeLongBreak,
  activeTask,
  soundEnabled,
  onSwitchMode,
  onToggleStartPause,
  onReset,
  onSkip,
  onSelectTasksTab,
  onToggleTaskComplete,
}) => {
  const currentSessionNumber = completedInCycle + 1;
  const isRunning = status === 'running';

  const modeButtons: { mode: TimerMode; label: string }[] = [
    { mode: 'focus', label: 'Focus' },
    { mode: 'shortBreak', label: 'Short Break' },
    { mode: 'longBreak', label: 'Long Break' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-2">
      {/* Mode Switcher Tabs */}
      <nav
        aria-label="Timer mode tabs"
        className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-surface-850/80 backdrop-blur-md rounded-2xl border border-slate-300/50 dark:border-surface-700/60 shadow-inner mb-8"
      >
        {modeButtons.map((tab) => {
          const isActive = mode === tab.mode;
          return (
            <button
              key={tab.mode}
              type="button"
              onClick={() => onSwitchMode(tab.mode)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-surface-700/90 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Circular Progress & Time Display */}
      <div className="relative">
        <ProgressRing progress={progress} mode={mode} size={320} strokeWidth={9}>
          {/* Subtitle / Session Type */}
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {MODE_CONFIG[mode].label}
          </span>

          {/* Big Countdown Timer with Tabular Figures */}
          <div
            className="text-6xl sm:text-7xl font-mono font-extrabold tracking-tight text-slate-900 dark:text-white my-1 select-all"
            aria-live="polite"
            aria-atomic="true"
          >
            {formatTime(timeLeft)}
          </div>

          {/* Session Progress Text */}
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {mode === 'focus'
              ? `Pomodoro ${currentSessionNumber} of ${sessionsBeforeLongBreak}`
              : isRunning
              ? 'Rest & Recharge'
              : 'Break time'}
          </span>

          {/* Session Dots Indicator */}
          <SessionDots
            completedInCycle={completedInCycle}
            totalInCycle={sessionsBeforeLongBreak}
            mode={mode}
          />
        </ProgressRing>
      </div>

      {/* Timer Controls: Reset, Start/Pause, Skip */}
      <TimerControls
        status={status}
        mode={mode}
        soundEnabled={soundEnabled}
        onToggleStartPause={onToggleStartPause}
        onReset={onReset}
        onSkip={onSkip}
      />

      {/* Active Task Badge */}
      <ActiveTaskBadge
        activeTask={activeTask}
        onSelectTasksTab={onSelectTasksTab}
        onToggleTaskComplete={onToggleTaskComplete}
      />
    </div>
  );
};
