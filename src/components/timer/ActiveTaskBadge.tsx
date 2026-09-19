import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { Task } from '../../types';

interface ActiveTaskBadgeProps {
  activeTask: Task | null;
  onSelectTasksTab: () => void;
  onToggleTaskComplete?: (taskId: string) => void;
}

export const ActiveTaskBadge: React.FC<ActiveTaskBadgeProps> = ({
  activeTask,
  onSelectTasksTab,
  onToggleTaskComplete,
}) => {
  if (!activeTask) {
    return (
      <button
        type="button"
        onClick={onSelectTasksTab}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-surface-850/60 hover:bg-slate-200/80 dark:hover:bg-surface-800 border border-slate-200/60 dark:border-surface-700/50 transition-all duration-200"
      >
        <Target className="w-4 h-4 text-slate-400" />
        <span>Select or add a task to focus on</span>
      </button>
    );
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-surface-850/90 border border-slate-200/80 dark:border-surface-700/80 shadow-sm max-w-sm w-full transition-all">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onToggleTaskComplete?.(activeTask.id)}
          title="Mark task completed"
          className="text-slate-400 hover:text-emerald-500 transition-colors flex-shrink-0"
        >
          {activeTask.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <div className="w-4 h-4 rounded-full border-2 border-slate-400 hover:border-emerald-500 transition-colors" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={`text-xs sm:text-sm font-semibold truncate ${
              activeTask.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-800 dark:text-slate-200'
            }`}
          >
            {activeTask.title}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {activeTask.actPomodoros} of {activeTask.estPomodoros} Pomodoros done
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onSelectTasksTab}
        className="text-[11px] font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:underline flex-shrink-0"
      >
        Change
      </button>
    </div>
  );
};
