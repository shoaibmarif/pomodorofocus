import React, { useState } from 'react';
import { X, Volume2, Bell, Clock, Sliders, Play, RotateCcw } from 'lucide-react';
import {
  TimerSettings,
  SoundSettings,
  NotificationSettings,
  DailyGoalSettings,
  AlarmSoundType,
} from '../../types';
import { playAlarmSound } from '../../utils/sound';
import {
  getNotificationPermission,
  requestNotificationPermission,
  sendTimerNotification,
} from '../../utils/notifications';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  timerSettings: TimerSettings;
  soundSettings: SoundSettings;
  notificationSettings: NotificationSettings;
  dailyGoalSettings: DailyGoalSettings;
  onUpdateTimerSettings: (s: TimerSettings) => void;
  onUpdateSoundSettings: (s: SoundSettings) => void;
  onUpdateNotificationSettings: (s: NotificationSettings) => void;
  onUpdateDailyGoalSettings: (s: DailyGoalSettings) => void;
  onResetDefaults: () => void;
}

type TabType = 'timer' | 'sound' | 'notifications' | 'goal';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  timerSettings,
  soundSettings,
  notificationSettings,
  dailyGoalSettings,
  onUpdateTimerSettings,
  onUpdateSoundSettings,
  onUpdateNotificationSettings,
  onUpdateDailyGoalSettings,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('timer');
  const [notifPermission, setNotifPermission] = useState(getNotificationPermission());

  if (!isOpen) return null;

  const handleTestAlarm = (type: AlarmSoundType) => {
    playAlarmSound(type, soundSettings.alarmVolume);
  };

  const handleRequestNotif = async () => {
    const granted = await requestNotificationPermission();
    setNotifPermission(getNotificationPermission());
    if (granted) {
      onUpdateNotificationSettings({ notificationsEnabled: true });
      sendTimerNotification('🔔 Notifications Active', 'You will receive alerts when your sessions end!');
    }
  };

  const handleTestNotif = () => {
    sendTimerNotification('🍅 Test Notification', 'Pomodoro Timer notifications are working smoothly!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-surface-850 rounded-3xl border border-slate-200/80 dark:border-surface-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-heading"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-surface-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-focus" />
            <h2 id="settings-heading" className="text-lg font-bold text-slate-900 dark:text-white">
              Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-surface-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-100 dark:border-surface-800 text-xs overflow-x-auto">
          {[
            { id: 'timer', label: 'Timer', icon: Clock },
            { id: 'sound', label: 'Sound', icon: Volume2 },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'goal', label: 'Daily Goal', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-focus text-focus'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* TIMER SETTINGS */}
          {activeTab === 'timer' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Time (Minutes)</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                      Focus
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      value={timerSettings.focusDuration}
                      onChange={(e) =>
                        onUpdateTimerSettings({
                          ...timerSettings,
                          focusDuration: Math.max(1, Math.min(120, parseInt(e.target.value) || 1)),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-surface-900 border border-slate-200 dark:border-surface-700 font-mono text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-focus/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                      Short Break
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={timerSettings.shortBreakDuration}
                      onChange={(e) =>
                        onUpdateTimerSettings({
                          ...timerSettings,
                          shortBreakDuration: Math.max(1, Math.min(60, parseInt(e.target.value) || 1)),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-surface-900 border border-slate-200 dark:border-surface-700 font-mono text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-focus/50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                      Long Break
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={timerSettings.longBreakDuration}
                      onChange={(e) =>
                        onUpdateTimerSettings({
                          ...timerSettings,
                          longBreakDuration: Math.max(1, Math.min(60, parseInt(e.target.value) || 1)),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-surface-900 border border-slate-200 dark:border-surface-700 font-mono text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-focus/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Long Break Interval
                  </label>
                  <span className="font-mono text-xs font-bold text-focus">
                    {timerSettings.sessionsBeforeLongBreak} sessions
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={timerSettings.sessionsBeforeLongBreak}
                  onChange={(e) =>
                    onUpdateTimerSettings({
                      ...timerSettings,
                      sessionsBeforeLongBreak: parseInt(e.target.value),
                    })
                  }
                  className="w-full accent-focus cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-surface-800 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-slate-700 dark:text-slate-300">Auto-start Breaks</span>
                  <input
                    type="checkbox"
                    checked={timerSettings.autoStartBreaks}
                    onChange={(e) =>
                      onUpdateTimerSettings({
                        ...timerSettings,
                        autoStartBreaks: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-focus focus:ring-focus accent-focus"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-slate-700 dark:text-slate-300">Auto-start Focus Sessions</span>
                  <input
                    type="checkbox"
                    checked={timerSettings.autoStartPomodoros}
                    onChange={(e) =>
                      onUpdateTimerSettings({
                        ...timerSettings,
                        autoStartPomodoros: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-focus focus:ring-focus accent-focus"
                  />
                </label>
              </div>
            </div>
          )}

          {/* SOUND SETTINGS */}
          {activeTab === 'sound' && (
            <div className="space-y-5">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">Alarm Sound</span>
                  <span className="text-xs text-slate-500">Play chime when session completes</span>
                </div>
                <input
                  type="checkbox"
                  checked={soundSettings.soundEnabled}
                  onChange={(e) =>
                    onUpdateSoundSettings({
                      ...soundSettings,
                      soundEnabled: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-focus focus:ring-focus accent-focus"
                />
              </label>

              {soundSettings.soundEnabled && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Sound Theme
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['chime', 'bell', 'digital', 'zen'] as AlarmSoundType[]).map((snd) => (
                        <div
                          key={snd}
                          onClick={() =>
                            onUpdateSoundSettings({
                              ...soundSettings,
                              alarmSound: snd,
                            })
                          }
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            soundSettings.alarmSound === snd
                              ? 'border-focus bg-focus/5 text-focus font-bold'
                              : 'border-slate-200 dark:border-surface-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="capitalize text-xs">{snd}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTestAlarm(snd);
                            }}
                            className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-surface-700 text-slate-400 hover:text-focus"
                            title="Preview sound"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Alarm Volume
                      </label>
                      <span className="font-mono text-xs font-bold text-focus">
                        {soundSettings.alarmVolume}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={soundSettings.alarmVolume}
                      onChange={(e) =>
                        onUpdateSoundSettings({
                          ...soundSettings,
                          alarmVolume: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-focus cursor-pointer"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-surface-800">
                    <label className="flex items-center justify-between cursor-pointer mb-3">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block text-xs">
                          Ticking Sound
                        </span>
                        <span className="text-[11px] text-slate-500">Subtle background clock tick</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={soundSettings.tickingEnabled}
                        onChange={(e) =>
                          onUpdateSoundSettings({
                            ...soundSettings,
                            tickingEnabled: e.target.checked,
                          })
                        }
                        className="w-4 h-4 rounded text-focus focus:ring-focus accent-focus"
                      />
                    </label>

                    {soundSettings.tickingEnabled && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] text-slate-500">Tick Volume</label>
                          <span className="font-mono text-xs text-slate-500">
                            {soundSettings.tickingVolume}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="100"
                          value={soundSettings.tickingVolume}
                          onChange={(e) =>
                            onUpdateSoundSettings({
                              ...soundSettings,
                              tickingVolume: parseInt(e.target.value),
                            })
                          }
                          className="w-full accent-focus cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Desktop Notifications
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Receive browser notifications when timer sessions complete even if you're in another tab or application.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-surface-900 border border-slate-200 dark:border-surface-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Permission Status
                  </span>
                  <span
                    className={`text-xs font-mono font-bold capitalize ${
                      notifPermission === 'granted'
                        ? 'text-emerald-500'
                        : notifPermission === 'denied'
                        ? 'text-rose-500'
                        : 'text-amber-500'
                    }`}
                  >
                    {notifPermission}
                  </span>
                </div>

                {notifPermission !== 'granted' && notifPermission !== 'unsupported' && (
                  <button
                    type="button"
                    onClick={handleRequestNotif}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-focus text-white hover:bg-focus-dark shadow-sm"
                  >
                    Allow Notifications
                  </button>
                )}
              </div>

              {notifPermission === 'granted' && (
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.notificationsEnabled}
                      onChange={(e) =>
                        onUpdateNotificationSettings({
                          notificationsEnabled: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-focus focus:ring-focus accent-focus"
                    />
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      Enable Desktop Alerts
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={handleTestNotif}
                    className="px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-focus bg-slate-100 dark:bg-surface-800 rounded-lg"
                  >
                    Send Test
                  </button>
                </div>
              )}
            </div>
          )}

          {/* DAILY GOAL */}
          {activeTab === 'goal' && (
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Daily Target
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Set how many focus Pomodoros you aim to complete each day.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={dailyGoalSettings.targetPomodoros}
                  onChange={(e) =>
                    onUpdateDailyGoalSettings({
                      targetPomodoros: parseInt(e.target.value),
                    })
                  }
                  className="w-full accent-focus cursor-pointer"
                />
                <span className="font-mono text-base font-bold text-focus w-12 text-right">
                  {dailyGoalSettings.targetPomodoros} 🍅
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-surface-900 border-t border-slate-100 dark:border-surface-800">
          <button
            type="button"
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-500 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-focus text-white hover:bg-focus-dark shadow-sm transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
