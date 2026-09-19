import React from 'react';
import { Volume2, VolumeX, Settings, HelpCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeMode } from '../../types';

interface HeaderProps {
  soundEnabled: boolean;
  theme: ThemeMode;
  onToggleSound: () => void;
  onSetTheme: (theme: ThemeMode) => void;
  onOpenSettings: () => void;
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  theme,
  onToggleSound,
  onSetTheme,
  onOpenSettings,
  onOpenShortcuts,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
      {/* Brand logo & title */}
      <div className="flex items-center gap-2.5 cursor-pointer select-none">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-md shadow-rose-500/20">
          <span className="text-lg">🍅</span>
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            Pomodoro
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-focus/10 text-focus border border-focus/20">
              Focus
            </span>
          </h1>
        </div>
      </div>

      {/* Header controls & actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Sound Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute sound (M)' : 'Unmute sound (M)'}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-surface-800 transition-colors"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-focus" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>

        {/* Shortcuts button */}
        <button
          type="button"
          onClick={onOpenShortcuts}
          title="Keyboard shortcuts (?)"
          aria-label="Keyboard shortcuts"
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-surface-800 transition-colors hidden sm:inline-flex"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Settings button */}
        <button
          type="button"
          onClick={onOpenSettings}
          title="Timer settings"
          aria-label="Timer settings"
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-surface-800 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Theme Segmented Toggle */}
        <ThemeToggle theme={theme} onSetTheme={onSetTheme} />
      </div>
    </header>
  );
};
