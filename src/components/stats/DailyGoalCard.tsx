import React, { useEffect, useRef } from 'react';
import { Target, CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserStats, DailyGoalSettings } from '../../types';
import { isSameDay } from '../../utils/time';

interface DailyGoalCardProps {
  stats: UserStats;
  dailyGoalSettings: DailyGoalSettings;
}

export const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ stats, dailyGoalSettings }) => {
  const now = Date.now();
  const todayCompleted = stats.history.filter((s) => isSameDay(s.completedAt, now) && s.mode === 'focus').length;
  const target = Math.max(1, dailyGoalSettings.targetPomodoros);
  const percent = Math.min(100, Math.round((todayCompleted / target) * 100));
  const remaining = Math.max(0, target - todayCompleted);
  const isGoalReached = todayCompleted >= target;

  const confettiFiredRef = useRef(false);

  useEffect(() => {
    if (isGoalReached && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EF4444', '#10B981', '#F59E0B', '#6366F1'],
        });
      } catch {
        // ignore if canvas-confetti fails
      }
    }
  }, [isGoalReached]);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-focus/10 text-focus">
            {isGoalReached ? <Trophy className="w-4 h-4 text-amber-500" /> : <Target className="w-4 h-4" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daily Pomodoro Goal</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isGoalReached
                ? '🎉 Daily goal accomplished! Amazing focus today.'
                : `${remaining} more session${remaining === 1 ? '' : 's'} to hit your target`}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white">
            {todayCompleted}
          </span>
          <span className="text-xs text-slate-400 font-mono"> / {target}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 dark:bg-surface-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-surface-700/60">
        <div
          style={{ width: `${percent}%` }}
          className={`h-full rounded-full transition-all duration-500 ${
            isGoalReached
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/30'
              : 'bg-gradient-to-r from-focus to-amber-500 shadow-sm shadow-focus/30'
          }`}
        />
      </div>

      <div className="flex items-center justify-between mt-2.5 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1">
          {isGoalReached && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
          <span>{percent}% completed</span>
        </div>
        <span>Target: {target} Pomodoros</span>
      </div>
    </div>
  );
};
