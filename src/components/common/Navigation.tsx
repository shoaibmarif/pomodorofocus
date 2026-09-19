import React from 'react';
import { Clock, ListTodo, BarChart3 } from 'lucide-react';

export type MainTabType = 'timer' | 'tasks' | 'stats';

interface NavigationProps {
  currentTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
  activeTaskCount: number;
  isTimerRunning: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  activeTaskCount,
  isTimerRunning,
}) => {
  const tabs = [
    {
      id: 'timer',
      label: 'Timer',
      icon: Clock,
      badge: isTimerRunning ? (
        <span className="w-2 h-2 rounded-full bg-focus animate-ping" />
      ) : null,
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: ListTodo,
      badge: activeTaskCount > 0 ? (
        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-surface-700 text-slate-700 dark:text-slate-300">
          {activeTaskCount}
        </span>
      ) : null,
    },
    {
      id: 'stats',
      label: 'Stats',
      icon: BarChart3,
      badge: null,
    },
  ];

  return (
    <nav
      aria-label="Main application tabs"
      className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8"
    >
      <div className="flex items-center gap-1 p-1 bg-white/70 dark:bg-surface-850/80 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id as MainTabType)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-surface-700/95 dark:text-white shadow-sm scale-100'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
