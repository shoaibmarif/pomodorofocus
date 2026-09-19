import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (title: string, estPomodoros: number) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [estPomodoros, setEstPomodoros] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim(), estPomodoros);
    setTitle('');
    setEstPomodoros(1);
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-surface-700 hover:border-focus/60 dark:hover:border-focus/60 text-slate-500 dark:text-slate-400 hover:text-focus transition-all flex items-center justify-center gap-2 font-medium text-sm group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Add a new task</span>
        </button>
      ) : (
        <div className="p-4 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200 dark:border-surface-700/80 shadow-md animate-fadeIn">
          <input
            type="text"
            placeholder="What are you working on?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-surface-900 border border-slate-200 dark:border-surface-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-focus/50 mb-3"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span>Estimated Pomodoros:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setEstPomodoros(num)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                      estPomodoros === num
                        ? 'bg-focus text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-surface-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-focus text-white hover:bg-focus-dark disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
