import { TimerSettings, SoundSettings, NotificationSettings, DailyGoalSettings, UserStats } from '../types';

export const STORAGE_KEYS = {
  TIMER_SETTINGS: 'pomodoro_timer_settings',
  SOUND_SETTINGS: 'pomodoro_sound_settings',
  NOTIFICATION_SETTINGS: 'pomodoro_notification_settings',
  DAILY_GOAL_SETTINGS: 'pomodoro_daily_goal_settings',
  THEME: 'pomodoro_theme',
  TASKS: 'pomodoro_tasks',
  ACTIVE_TASK_ID: 'pomodoro_active_task_id',
  STATS: 'pomodoro_stats',
  CURRENT_CYCLE: 'pomodoro_current_cycle',
  TIMER_STATE: 'pomodoro_active_timer_state',
} as const;

export const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
};

export const DEFAULT_SOUND_SETTINGS: SoundSettings = {
  soundEnabled: true,
  alarmSound: 'chime',
  alarmVolume: 80,
  tickingEnabled: false,
  tickingVolume: 25,
};

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  notificationsEnabled: false,
};

export const DEFAULT_DAILY_GOAL_SETTINGS: DailyGoalSettings = {
  targetPomodoros: 6,
};

export const DEFAULT_STATS: UserStats = {
  totalCompletedPomodoros: 0,
  totalFocusMinutes: 0,
  history: [],
  currentStreak: 0,
  bestStreak: 0,
  lastActiveDate: '',
};

export const MODE_CONFIG = {
  focus: {
    label: 'Focus Session',
    shortLabel: 'Focus',
    colorClass: 'text-focus',
    bgClass: 'bg-focus',
    borderClass: 'border-focus',
    glowClass: 'shadow-glow-focus',
    ringColor: '#EF4444',
    accentGrad: 'from-rose-500 to-amber-500',
  },
  shortBreak: {
    label: 'Short Break',
    shortLabel: 'Short Break',
    colorClass: 'text-shortBreak',
    bgClass: 'bg-shortBreak',
    borderClass: 'border-shortBreak',
    glowClass: 'shadow-glow-short',
    ringColor: '#10B981',
    accentGrad: 'from-emerald-400 to-teal-500',
  },
  longBreak: {
    label: 'Long Break',
    shortLabel: 'Long Break',
    colorClass: 'text-longBreak',
    bgClass: 'bg-longBreak',
    borderClass: 'border-longBreak',
    glowClass: 'shadow-glow-long',
    ringColor: '#06B6D4',
    accentGrad: 'from-cyan-400 to-indigo-500',
  },
} as const;
