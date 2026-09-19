import React from 'react';
import { Flame, Clock, CheckCircle, Award } from 'lucide-react';
import { UserStats } from '../../types';
import { formatDuration, isSameDay } from '../../utils/time';

interface StatsOverviewProps {
  stats: UserStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const now = Date.now();
  const todayHistory = stats.history.filter((s) => isSameDay(s.completedAt, now) && s.mode === 'focus');

  const todayPomodoros = todayHistory.length;
  const todayFocusMinutes = todayHistory.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  const totalFocusHours = (stats.totalFocusMinutes / 60).toFixed(1);

  const cards = [
    {
      title: "Today's Focus",
      value: formatDuration(todayFocusMinutes),
      subtext: `${todayPomodoros} Pomodoro${todayPomodoros === 1 ? '' : 's'}`,
      icon: Clock,
      color: 'text-amber-500 dark:text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} Day${stats.currentStreak === 1 ? '' : 's'}`,
      subtext: `Best: ${stats.bestStreak} day${stats.bestStreak === 1 ? '' : 's'}`,
      icon: Flame,
      color: 'text-rose-500 dark:text-rose-400',
      bg: 'bg-rose-500/10',
    },
    {
      title: 'Total Pomodoros',
      value: stats.totalCompletedPomodoros,
      subtext: 'Completed sessions',
      icon: CheckCircle,
      color: 'text-emerald-500 dark:text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      title: 'Total Focus Hours',
      value: `${totalFocusHours}h`,
      subtext: `${stats.totalFocusMinutes} total minutes`,
      icon: Award,
      color: 'text-cyan-500 dark:text-cyan-400',
      bg: 'bg-cyan-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-xl ${card.bg}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                {card.value}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
