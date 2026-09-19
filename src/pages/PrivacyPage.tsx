import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Lock, HardDrive, EyeOff, CheckCircle2, FileText, User } from 'lucide-react';

interface PrivacyPageProps {
  onNavigateHome: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    document.title = 'Privacy Policy – Pomodoro Timer';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Breadcrumbs & Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-surface-850/80 hover:bg-slate-100 dark:hover:bg-surface-800 border border-slate-200/80 dark:border-surface-700/60 shadow-sm transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Timer</span>
        </button>

        <div className="text-xs text-slate-400 dark:text-slate-500">
          Last Updated: September 19, 2026
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 mb-3 border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Local-First & Private</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          We believe your productivity, thoughts, and schedule are your personal domain. 
          This application operates entirely in your browser with zero data collection, zero backend servers, and zero remote tracking.
        </p>
      </div>

      {/* Core Privacy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-base text-slate-900 dark:text-white mb-1">Zero Backend</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            There is no server database, user authentication backend, or remote data pipeline. Your browser does not send your data anywhere.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <div className="p-2 rounded-xl bg-focus/10 text-focus w-fit mb-3">
            <HardDrive className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-base text-slate-900 dark:text-white mb-1">Device Storage Only</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All your timer settings, tasks, and productivity statistics are stored directly in your browser’s LocalStorage on your machine.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 w-fit mb-3">
            <EyeOff className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-base text-slate-900 dark:text-white mb-1">Zero Tracking</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No analytics pixels, no third-party telemetry, no marketing cookies, and no browser fingerprinting scripts.
          </p>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="space-y-8 text-sm leading-relaxed">
        <section className="p-6 rounded-3xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            1. Information We Do Not Collect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-3">
            When you visit and use this website, we collect <strong>none</strong> of the following:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-2">
            <li><strong>Personal Identification</strong>: We do not collect names, email addresses, phone numbers, or mailing addresses.</li>
            <li><strong>Task Data</strong>: Your task titles, completion marks, and estimated Pomodoros remain on your browser client.</li>
            <li><strong>Productivity Logs</strong>: Focus session durations, timestamps, and streak numbers are strictly computed locally.</li>
            <li><strong>IP & Geolocation</strong>: We do not log IP addresses, GPS coordinates, or ISP identities.</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-focus" />
            2. LocalStorage Data Audit
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            To make your experience persistent without an account, we use standard browser <code>localStorage</code>. Here is the full audit of keys used by this application:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-surface-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-surface-800 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-3">Storage Key</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Data Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-surface-700 text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="p-3 font-mono text-focus">pomodoro_timer_settings</td>
                  <td className="p-3">Custom durations for Focus, Short Break, and Long Break</td>
                  <td className="p-3">JSON Object</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-focus">pomodoro_sound_settings</td>
                  <td className="p-3">Audio sound theme, master volume, ticking sound toggle</td>
                  <td className="p-3">JSON Object</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-focus">pomodoro_tasks</td>
                  <td className="p-3">Your personal task list and completed Pomodoro counters</td>
                  <td className="p-3">JSON Array</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-focus">pomodoro_stats</td>
                  <td className="p-3">Session history records, streaks, and total focus minutes</td>
                  <td className="p-3">JSON Object</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-focus">pomodoro_theme</td>
                  <td className="p-3">Light, Dark, or System mode appearance preference</td>
                  <td className="p-3">String</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-focus">pomodoro_active_timer_state</td>
                  <td className="p-3">Active countdown time so sessions survive page refreshes</td>
                  <td className="p-3">JSON Object</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="p-6 rounded-3xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            3. Web Audio API & Desktop Notifications
          </h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-400">
            <p>
              <strong>Sound Synthesis:</strong> Timer alarms, bells, and ticks are synthesized on the fly via the browser’s native <code>AudioContext</code>. No audio tracks are fetched from remote servers.
            </p>
            <p>
              <strong>Notifications:</strong> Browser desktop notifications require your explicit permission. If enabled, notifications are created and dismissed locally on your operating system.
            </p>
          </div>
        </section>

        <section className="p-6 rounded-3xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            4. User Rights & Data Deletion
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-3">
            Because all information is strictly stored on your own device, you possess unilateral and immediate control over its retention:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-2">
            <li>You can clear your session history at any time in the <strong>Stats</strong> tab.</li>
            <li>You can reset all timer and sound configurations in the <strong>Settings</strong> modal.</li>
            <li>You can instantly purge all application data by clearing your browser cache and local storage for this domain.</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-focus" />
            5. Creator & Contact Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            This Pomodoro Timer was designed and architected by <strong>Shoaib Arif</strong> as a modern open-source productivity tool.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-surface-800 text-slate-900 dark:text-white hover:text-focus transition-colors"
            >
              GitHub: github.com/shoaibmarif
            </a>
            <a
              href="https://www.linkedin.com/in/shoaibmarif/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-surface-800 text-slate-900 dark:text-white hover:text-focus transition-colors"
            >
              LinkedIn: linkedin.com/in/shoaibmarif
            </a>
          </div>
        </section>
      </div>

      {/* Return to App Button */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onNavigateHome}
          className="px-8 py-3 rounded-2xl font-bold text-sm bg-focus text-white hover:bg-focus-dark shadow-lg shadow-focus/30 hover:shadow-focus/50 transition-all active:scale-95"
        >
          Return to Pomodoro Timer
        </button>
      </div>
    </div>
  );
};
