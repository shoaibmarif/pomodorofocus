export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused';
export type ThemeMode = 'light' | 'dark' | 'system';
export type AlarmSoundType = 'bell' | 'chime' | 'digital' | 'zen';

export interface TimerSettings {
  focusDuration: number;        // in minutes (1 - 120)
  shortBreakDuration: number;   // in minutes (1 - 60)
  longBreakDuration: number;    // in minutes (1 - 60)
  sessionsBeforeLongBreak: number; // default 4 (1 - 12)
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

export interface SoundSettings {
  soundEnabled: boolean;
  alarmSound: AlarmSoundType;
  alarmVolume: number;          // 0 - 100
  tickingEnabled: boolean;
  tickingVolume: number;        // 0 - 100
}

export interface NotificationSettings {
  notificationsEnabled: boolean;
}

export interface DailyGoalSettings {
  targetPomodoros: number;      // default 6 (1 - 24)
}

export interface Task {
  id: string;
  title: string;
  actPomodoros: number;
  estPomodoros: number;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

export interface SessionRecord {
  id: string;
  mode: TimerMode;
  durationMinutes: number;
  completedAt: number;          // unix timestamp ms
  taskId?: string;
  taskTitle?: string;
}

export interface UserStats {
  totalCompletedPomodoros: number;
  totalFocusMinutes: number;
  history: SessionRecord[];
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;        // 'YYYY-MM-DD'
}
