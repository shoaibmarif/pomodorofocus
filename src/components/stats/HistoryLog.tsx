import React from 'react';
import { History, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import { SessionRecord } from '../../types';
import { MODE_CONFIG } from '../../constants/defaults';

interface HistoryLogProps {
  history: SessionRecord[];
  onClearHistory: () => void;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ history, onClearHistory }) => {
  const recentSessions = [...history].reverse().slice(0, 15);

  const formatSessionTime = (ms: number): string => {
    const d = new Date(ms);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatSessionDate = (ms: number): string => {
    const d = new Date(ms);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) {
      return 'Today';
    }
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-focus" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Sessions</h3>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition-colors"
            title="Clear all session history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {recentSessions.length === 0 ? (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs">
          No completed sessions recorded yet. Start your first focus block!
        </div>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {recentSessions.map((session) => {
            const config = MODE_CONFIG[session.mode];
            return (
              <div
                key={session.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-surface-900/70 border border-slate-200/50 dark:border-surface-800 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      session.mode === 'focus'
                        ? 'bg-focus'
                        : session.mode === 'shortBreak'
                        ? 'bg-shortBreak'
                        : 'bg-longBreak'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {session.taskTitle || config.label}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {formatSessionDate(session.completedAt)} at {formatSessionTime(session.completedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="flex items-center gap-1 font-mono font-medium text-slate-600 dark:text-slate-300">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {session.durationMinutes}m
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
