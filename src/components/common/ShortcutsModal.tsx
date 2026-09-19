import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Start or pause the countdown timer' },
    { key: 'R', desc: 'Reset current session timer' },
    { key: 'S', desc: 'Skip forward to the next session' },
    { key: 'M', desc: 'Mute or unmute synthesized sound effects' },
    { key: '?', desc: 'Open this keyboard shortcuts cheatsheet' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white dark:bg-surface-850 rounded-3xl border border-slate-200/80 dark:border-surface-700 shadow-2xl p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-surface-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-focus" />
            <h2 id="shortcuts-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-surface-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-600 dark:text-slate-300">{s.desc}</span>
              <kbd className="px-2.5 py-1 font-mono font-bold text-xs bg-slate-100 dark:bg-surface-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-surface-700 rounded-lg shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-surface-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-focus text-white hover:bg-focus-dark shadow-sm transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
