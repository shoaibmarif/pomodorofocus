import React from 'react';
import { TimerMode } from '../../types';
import { MODE_CONFIG } from '../../constants/defaults';

interface ProgressRingProps {
  progress: number; // 0 to 1
  mode: TimerMode;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  mode,
  size = 320,
  strokeWidth = 10,
  children,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth - 6;
  const circumference = 2 * Math.PI * radius;
  // progress goes from 0 (start) to 1 (complete)
  // strokeDashoffset: circumference * (1 - progress)
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const offset = circumference * (1 - clampedProgress);

  const ringColor = MODE_CONFIG[mode].ringColor;

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 transition-all duration-300 drop-shadow-xl"
      >
        <defs>
          <filter id={`ring-glow-${mode}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={ringColor} floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-slate-200/60 dark:stroke-surface-800/80"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Dynamic Progress track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          filter={`url(#ring-glow-${mode})`}
          className="transition-[stroke-dashoffset] duration-300 ease-linear"
        />
      </svg>

      {/* Embedded Central Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
};
