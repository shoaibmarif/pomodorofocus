import React from 'react';
import { TimerMode } from '../../types';

interface SessionDotsProps {
  completedInCycle: number;
  totalInCycle: number;
  mode: TimerMode;
}

export const SessionDots: React.FC<SessionDotsProps> = ({
  completedInCycle,
  totalInCycle,
  mode,
}) => {
  const dots = Array.from({ length: totalInCycle }, (_, i) => i);

  return (
    <div className="flex items-center gap-2 mt-3" aria-label={`Cycle progress: ${completedInCycle} of ${totalInCycle} sessions completed`}>
      {dots.map((index) => {
        const isCompleted = index < completedInCycle;
        const isCurrent = index === completedInCycle && mode === 'focus';

        return (
          <div
            key={index}
            className={`transition-all duration-300 rounded-full ${
              isCompleted
                ? 'w-3 h-3 bg-focus shadow-sm shadow-focus/50'
                : isCurrent
                ? 'w-3.5 h-3.5 border-2 border-focus animate-pulse bg-focus/30'
                : 'w-2.5 h-2.5 bg-slate-300 dark:bg-surface-700'
            }`}
            title={`Session ${index + 1} of ${totalInCycle}`}
          />
        );
      })}
    </div>
  );
};
