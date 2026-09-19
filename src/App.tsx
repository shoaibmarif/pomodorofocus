import { useState, useCallback } from 'react';
import { Header } from './components/common/Header';
import { Navigation, MainTabType } from './components/common/Navigation';
import { Footer } from './components/common/Footer';
import { ShortcutsModal } from './components/common/ShortcutsModal';
import { PrivacyModal } from './components/common/PrivacyModal';
import { TimerDisplay } from './components/timer/TimerDisplay';
import { TaskList } from './components/tasks/TaskList';
import { Statistics } from './components/stats/Statistics';
import { SettingsModal } from './components/settings/SettingsModal';
import { GuideSection } from './components/seo/GuideSection';
import { FaqAccordion } from './components/seo/FaqAccordion';

import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import { usePomodoroTimer } from './hooks/usePomodoroTimer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

import {
  TimerSettings,
  SoundSettings,
  NotificationSettings,
  DailyGoalSettings,
  UserStats,
  Task,
  SessionRecord,
} from './types';
import {
  DEFAULT_TIMER_SETTINGS,
  DEFAULT_SOUND_SETTINGS,
  DEFAULT_NOTIFICATION_SETTINGS,
  DEFAULT_DAILY_GOAL_SETTINGS,
  DEFAULT_STATS,
  STORAGE_KEYS,
} from './constants/defaults';
import { getLocalDateString } from './utils/time';

export function App() {
  const [theme, setTheme] = useTheme();

  // Settings
  const [timerSettings, setTimerSettings] = useLocalStorage<TimerSettings>(
    STORAGE_KEYS.TIMER_SETTINGS,
    DEFAULT_TIMER_SETTINGS
  );
  const [soundSettings, setSoundSettings] = useLocalStorage<SoundSettings>(
    STORAGE_KEYS.SOUND_SETTINGS,
    DEFAULT_SOUND_SETTINGS
  );
  const [notificationSettings, setNotificationSettings] = useLocalStorage<NotificationSettings>(
    STORAGE_KEYS.NOTIFICATION_SETTINGS,
    DEFAULT_NOTIFICATION_SETTINGS
  );
  const [dailyGoalSettings, setDailyGoalSettings] = useLocalStorage<DailyGoalSettings>(
    STORAGE_KEYS.DAILY_GOAL_SETTINGS,
    DEFAULT_DAILY_GOAL_SETTINGS
  );

  // Tasks & Active Task
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.TASKS, []);
  const [activeTaskId, setActiveTaskId] = useLocalStorage<string | null>(
    STORAGE_KEYS.ACTIVE_TASK_ID,
    null
  );

  // Stats
  const [stats, setStats] = useLocalStorage<UserStats>(STORAGE_KEYS.STATS, DEFAULT_STATS);

  // UI Navigation & Modals
  const [currentTab, setCurrentTab] = useState<MainTabType>('timer');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const activeTask = tasks.find((t) => t.id === activeTaskId) || null;

  // Handler when a Focus Session finishes
  const handleFocusComplete = useCallback(
    (durationMinutes: number) => {
      const now = Date.now();
      const todayStr = getLocalDateString(new Date(now));

      setStats((prevStats) => {
        let newStreak = prevStats.currentStreak;
        if (!prevStats.lastActiveDate) {
          newStreak = 1;
        } else if (prevStats.lastActiveDate === todayStr) {
          // Already recorded for today
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = getLocalDateString(yesterday);
          if (prevStats.lastActiveDate === yesterdayStr) {
            newStreak = prevStats.currentStreak + 1;
          } else {
            newStreak = 1;
          }
        }

        const newBestStreak = Math.max(prevStats.bestStreak, newStreak);

        const newRecord: SessionRecord = {
          id: `session-${now}-${Math.random().toString(36).substring(2, 7)}`,
          mode: 'focus',
          durationMinutes,
          completedAt: now,
          taskId: activeTask?.id,
          taskTitle: activeTask?.title,
        };

        return {
          totalCompletedPomodoros: prevStats.totalCompletedPomodoros + 1,
          totalFocusMinutes: prevStats.totalFocusMinutes + durationMinutes,
          history: [newRecord, ...prevStats.history].slice(0, 100), // retain last 100 sessions
          currentStreak: newStreak,
          bestStreak: newBestStreak,
          lastActiveDate: todayStr,
        };
      });

      // Increment task pomodoro count
      if (activeTaskId) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === activeTaskId ? { ...t, actPomodoros: t.actPomodoros + 1 } : t
          )
        );
      }
    },
    [activeTask, activeTaskId, setStats, setTasks]
  );

  // Handler when a Break Session finishes
  const handleBreakComplete = useCallback(
    (mode: 'shortBreak' | 'longBreak', durationMinutes: number) => {
      const now = Date.now();
      const newRecord: SessionRecord = {
        id: `session-${now}-${Math.random().toString(36).substring(2, 7)}`,
        mode,
        durationMinutes,
        completedAt: now,
      };

      setStats((prevStats) => ({
        ...prevStats,
        history: [newRecord, ...prevStats.history].slice(0, 100),
      }));
    },
    [setStats]
  );

  // Initialize Pomodoro Timer Engine
  const {
    mode,
    status,
    timeLeft,
    progress,
    completedInCycle,
    sessionsBeforeLongBreak,
    resetTimer,
    skipSession,
    switchMode,
    toggleStartPause,
  } = usePomodoroTimer({
    timerSettings,
    soundSettings,
    notificationSettings,
    onFocusComplete: handleFocusComplete,
    onBreakComplete: handleBreakComplete,
  });

  // Sound toggle helper
  const handleToggleSound = useCallback(() => {
    setSoundSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, [setSoundSettings]);

  // Global Keyboard Shortcuts
  useKeyboardShortcuts({
    onToggleStartPause: toggleStartPause,
    onReset: resetTimer,
    onSkip: skipSession,
    onToggleMute: handleToggleSound,
    onOpenShortcuts: () => setIsShortcutsOpen((prev) => !prev),
  });

  // Task Actions
  const handleAddTask = (title: string, estPomodoros: number) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      actPomodoros: 0,
      estPomodoros,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    if (!activeTaskId) {
      setActiveTaskId(newTask.id);
    }
  };

  const handleSetActiveTask = (taskId: string) => {
    setActiveTaskId((prev) => (prev === taskId ? null : taskId));
  };

  const handleToggleCompleteTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? Date.now() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (activeTaskId === taskId) {
      setActiveTaskId(null);
    }
  };

  const handleUpdateTaskTitle = (taskId: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t))
    );
  };

  const handleClearCompletedTasks = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your session history?')) {
      setStats((prev) => ({
        ...prev,
        history: [],
      }));
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all settings to default values?')) {
      setTimerSettings(DEFAULT_TIMER_SETTINGS);
      setSoundSettings(DEFAULT_SOUND_SETTINGS);
      setNotificationSettings(DEFAULT_NOTIFICATION_SETTINGS);
      setDailyGoalSettings(DEFAULT_DAILY_GOAL_SETTINGS);
    }
  };

  const activeTaskCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-focus/20 selection:text-focus transition-colors duration-200">
      <div>
        {/* Header */}
        <Header
          soundEnabled={soundSettings.soundEnabled}
          theme={theme}
          onToggleSound={handleToggleSound}
          onSetTheme={setTheme}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* Main Content Area */}
        <main className="w-full max-w-4xl mx-auto px-4 py-2">
          {/* Main Navigation Tabs */}
          <Navigation
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            activeTaskCount={activeTaskCount}
            isTimerRunning={status === 'running'}
          />

          {/* Tab Views */}
          <div className="transition-all duration-300">
            {currentTab === 'timer' && (
              <TimerDisplay
                mode={mode}
                status={status}
                timeLeft={timeLeft}
                progress={progress}
                completedInCycle={completedInCycle}
                sessionsBeforeLongBreak={sessionsBeforeLongBreak}
                activeTask={activeTask}
                soundEnabled={soundSettings.soundEnabled}
                onSwitchMode={switchMode}
                onToggleStartPause={toggleStartPause}
                onReset={resetTimer}
                onSkip={skipSession}
                onSelectTasksTab={() => setCurrentTab('tasks')}
                onToggleTaskComplete={handleToggleCompleteTask}
              />
            )}

            {currentTab === 'tasks' && (
              <TaskList
                tasks={tasks}
                activeTaskId={activeTaskId}
                onAddTask={handleAddTask}
                onSetActiveTask={handleSetActiveTask}
                onToggleCompleteTask={handleToggleCompleteTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTaskTitle={handleUpdateTaskTitle}
                onClearCompletedTasks={handleClearCompletedTasks}
              />
            )}

            {currentTab === 'stats' && (
              <Statistics
                stats={stats}
                dailyGoalSettings={dailyGoalSettings}
                onClearHistory={handleClearHistory}
              />
            )}
          </div>
        </main>
      </div>

      {/* Educational Guide & SEO Section */}
      <GuideSection />

      {/* FAQ Accordion Section */}
      <FaqAccordion />

      {/* Footer */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        timerSettings={timerSettings}
        soundSettings={soundSettings}
        notificationSettings={notificationSettings}
        dailyGoalSettings={dailyGoalSettings}
        onUpdateTimerSettings={setTimerSettings}
        onUpdateSoundSettings={setSoundSettings}
        onUpdateNotificationSettings={setNotificationSettings}
        onUpdateDailyGoalSettings={setDailyGoalSettings}
        onResetDefaults={handleResetDefaults}
      />

      {/* Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
export default App;
