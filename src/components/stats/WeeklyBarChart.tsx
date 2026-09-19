import React from 'react';
import { UserStats } from '../../types';
import { getLast7Days, getLocalDateString } from '../../utils/time';

interface WeeklyBarChartProps {
  stats: UserStats;
}

export const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ stats }) => {
  const days = getLast7Days();

  // Aggregate focus minutes per day
  const data = days.map((day) => {
    const daySessions = stats.history.filter(
      (s) => s.mode === 'focus' && getLocalDateString(new Date(s.completedAt)) === day.dateStr
    );
    const totalMinutes = daySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    const count = daySessions.length;
    return {
      ...day,
      minutes: totalMinutes,
      count,
    };
  });

  const maxMinutes = Math.max(60, ...data.map((d) => d.minutes));

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Past 7 Days Activity</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Daily focus minutes</p>
        </div>
        <span className="text-xs font-semibold text-focus">
          {data.reduce((sum, d) => sum + d.minutes, 0)}m total
        </span>
      </div>

      <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2">
        {data.map((item, index) => {
          const heightPercent = Math.max(6, Math.round((item.minutes / maxMinutes) * 100));
          const isToday = index === data.length - 1;

          return (
            <div key={item.dateStr} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {/* Tooltip on hover */}
              <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900 text-white text-[10px] font-mono py-1 px-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                {item.minutes}m ({item.count} 🍅)
              </div>

              {/* Bar */}
              <div className="w-full max-w-[36px] bg-slate-100 dark:bg-surface-800 rounded-xl overflow-hidden flex flex-col justify-end h-full">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-xl transition-all duration-500 ${
                    item.minutes > 0
                      ? isToday
                        ? 'bg-gradient-to-t from-focus to-amber-500 shadow-sm shadow-focus/30'
                        : 'bg-gradient-to-t from-rose-500/80 to-rose-400/90 dark:from-rose-600/80 dark:to-rose-500/90'
                      : 'bg-transparent'
                  }`}
                />
              </div>

              {/* Day Label */}
              <div className="mt-2 text-center">
                <span
                  className={`text-[11px] block font-medium ${
                    isToday
                      ? 'text-focus font-bold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.dayName}
                </span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 block">
                  {item.shortDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
