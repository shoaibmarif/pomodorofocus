import React, { useState } from 'react';
import { CheckSquare, ListTodo } from 'lucide-react';
import { Task } from '../../types';
import { TaskInput } from './TaskInput';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  activeTaskId: string | null;
  onAddTask: (title: string, estPomodoros: number) => void;
  onSetActiveTask: (taskId: string) => void;
  onToggleCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskTitle: (taskId: string, newTitle: string) => void;
  onClearCompletedTasks: () => void;
}

type FilterType = 'all' | 'active' | 'completed';

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  activeTaskId,
  onAddTask,
  onSetActiveTask,
  onToggleCompleteTask,
  onDeleteTask,
  onUpdateTaskTitle,
  onClearCompletedTasks,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="w-full max-w-lg mx-auto py-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListTodo className="w-5 h-5 text-focus" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tasks</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-surface-800 text-slate-600 dark:text-slate-300">
            {tasks.length}
          </span>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-surface-850 p-1 rounded-xl border border-slate-200/60 dark:border-surface-700/60 text-xs">
          {(['all', 'active', 'completed'] as FilterType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-2.5 py-1 rounded-lg font-medium capitalize transition-all ${
                filter === tab
                  ? 'bg-white dark:bg-surface-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Task input */}
      <TaskInput onAddTask={onAddTask} />

      {/* Task list items */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-surface-800">
            <CheckSquare className="w-10 h-10 mx-auto text-slate-300 dark:text-surface-700 mb-2" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {filter === 'completed'
                ? 'No completed tasks yet.'
                : filter === 'active'
                ? 'All caught up! No active tasks.'
                : 'No tasks added yet. Start by adding one above!'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isActive={activeTaskId === task.id}
              onSetActive={onSetActiveTask}
              onToggleComplete={onToggleCompleteTask}
              onDelete={onDeleteTask}
              onUpdateTitle={onUpdateTaskTitle}
            />
          ))
        )}
      </div>

      {/* Footer / Clear Completed */}
      {completedCount > 0 && (
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClearCompletedTasks}
            className="text-xs text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
          >
            Clear completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
};
