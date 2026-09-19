import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Edit2, Check, X, Star } from 'lucide-react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  isActive: boolean;
  onSetActive: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdateTitle: (taskId: string, newTitle: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isActive,
  onSetActive,
  onToggleComplete,
  onDelete,
  onUpdateTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdateTitle(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div
      className={`group relative flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 ${
        isActive
          ? 'bg-white dark:bg-surface-850 border-focus/60 dark:border-focus/60 shadow-md shadow-focus/5 ring-1 ring-focus/40'
          : 'bg-white/80 dark:bg-surface-850/70 hover:bg-white dark:hover:bg-surface-850 border-slate-200/80 dark:border-surface-700/60 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Toggle complete button */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark uncompleted' : 'Mark completed'}
          className="text-slate-400 hover:text-emerald-500 dark:text-slate-500 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        {/* Task Title / Edit Form */}
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
                className="w-full px-2 py-1 text-sm bg-slate-100 dark:bg-surface-800 border border-slate-300 dark:border-surface-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-focus/50"
              />
              <button
                type="button"
                onClick={handleSaveEdit}
                className="p-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium truncate ${
                  task.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {task.title}
              </span>
              {isActive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-focus/10 text-focus dark:bg-focus/20 border border-focus/30">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Active
                </span>
              )}
            </div>
          )}

          {/* Pomodoro count */}
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            <span>🍅</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {task.actPomodoros}
            </span>
            <span>/</span>
            <span>{task.estPomodoros}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        {!task.completed && (
          <button
            type="button"
            onClick={() => onSetActive(task.id)}
            title={isActive ? 'Active Task' : 'Set as active focus task'}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? 'bg-focus text-white shadow-sm'
                : 'bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-surface-700'
            }`}
          >
            {isActive ? 'Active' : 'Focus'}
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          title="Edit title"
          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          title="Delete task"
          className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
