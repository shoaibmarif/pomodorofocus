import React from 'react';
import { BarChart3 } from 'lucide-react';
import { UserStats, DailyGoalSettings } from '../../types';
import { StatsOverview } from './StatsOverview';
import { DailyGoalCard } from './DailyGoalCard';
import { WeeklyBarChart } from './WeeklyBarChart';
import { HistoryLog } from './HistoryLog';

interface StatisticsProps {
  stats: UserStats;
  dailyGoalSettings: DailyGoalSettings;
  onClearHistory: () => void;
}

export const Statistics: React.FC<StatisticsProps> = ({
  stats,
  dailyGoalSettings,
  onClearHistory,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-focus" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Productivity & Statistics</h2>
      </div>

      <StatsOverview stats={stats} />
      <DailyGoalCard stats={stats} dailyGoalSettings={dailyGoalSettings} />
      <WeeklyBarChart stats={stats} />
      <HistoryLog history={stats.history} onClearHistory={onClearHistory} />
    </div>
  );
};
