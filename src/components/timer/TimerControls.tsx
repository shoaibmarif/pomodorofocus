import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerMode, TimerStatus } from '../../types';
import { playButtonSound } from '../../utils/sound';

interface TimerControlsProps {
  status: TimerStatus;
  mode: TimerMode;
  soundEnabled: boolean;
  onToggleStartPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  status,
  mode,
  soundEnabled,
  onToggleStartPause,
  onReset,
  onSkip,
}) => {
  const isRunning = status === 'running';

  const handleStartPause = () => {
    if (soundEnabled) playButtonSound();
    onToggleStartPause();
  };

  const handleReset = () => {
    if (soundEnabled) playButtonSound();
    onReset();
  };

  const handleSkip = () => {
    if (soundEnabled) playButtonSound();
    onSkip();
  };

  const getPrimaryButtonStyle = () => {
    switch (mode) {
      case 'focus':
        return 'bg-focus hover:bg-focus-dark text-white shadow-lg shadow-focus/30 hover:shadow-focus/50 focus:ring-focus/50';
      case 'shortBreak':
        return 'bg-shortBreak hover:bg-shortBreak-dark text-white shadow-lg shadow-shortBreak/30 hover:shadow-shortBreak/50 focus:ring-shortBreak/50';
      case 'longBreak':
        return 'bg-longBreak hover:bg-longBreak-dark text-white shadow-lg shadow-longBreak/30 hover:shadow-longBreak/50 focus:ring-longBreak/50';
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
      {/* Reset button */}
      <button
        type="button"
        onClick={handleReset}
        title="Reset session (R)"
        aria-label="Reset timer"
        className="p-3.5 rounded-2xl bg-white/80 dark:bg-surface-850/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-surface-700/60 shadow-sm hover:shadow transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        <RotateCcw className="w-5 h-5" />
      </button>

      {/* Primary Start/Pause button */}
      <button
        type="button"
        onClick={handleStartPause}
        title={isRunning ? 'Pause (Space)' : 'Start (Space)'}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        className={`px-8 sm:px-10 py-4 rounded-2xl font-bold tracking-wide uppercase text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 ${getPrimaryButtonStyle()}`}
      >
        {isRunning ? (
          <>
            <Pause className="w-5 h-5 fill-current" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 fill-current ml-0.5" />
            <span>{status === 'paused' ? 'Resume' : 'Start'}</span>
          </>
        )}
      </button>

      {/* Skip button */}
      <button
        type="button"
        onClick={handleSkip}
        title="Skip session (S)"
        aria-label="Skip timer session"
        className="p-3.5 rounded-2xl bg-white/80 dark:bg-surface-850/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-surface-700/60 shadow-sm hover:shadow transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  );
};
