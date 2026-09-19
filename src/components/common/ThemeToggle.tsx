import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { ThemeMode } from '../../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onSetTheme: (theme: ThemeMode) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onSetTheme }) => {
  const options: { mode: ThemeMode; icon: React.FC<{ className?: string }>; title: string }[] = [
    { mode: 'light', icon: Sun, title: 'Light mode' },
    { mode: 'dark', icon: Moon, title: 'Dark mode' },
    { mode: 'system', icon: Laptop, title: 'System theme' },
  ];

  return (
    <div className="flex items-center bg-slate-200/70 dark:bg-surface-850 p-1 rounded-xl border border-slate-300/50 dark:border-surface-700/60 shadow-inner">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.mode;
        return (
          <button
            key={opt.mode}
            type="button"
            onClick={() => onSetTheme(opt.mode)}
            title={opt.title}
            aria-label={opt.title}
            className={`p-1.5 rounded-lg transition-all ${
              isActive
                ? 'bg-white dark:bg-surface-700 text-focus shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
};
