import React from 'react';
import { X, ShieldCheck, Lock, HardDrive, EyeOff, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-surface-850 rounded-3xl border border-slate-200/80 dark:border-surface-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-surface-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-policy-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Privacy Policy
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                100% Local-First & Zero Data Collection
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Privacy Policy"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-surface-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-surface-900 border border-slate-200/60 dark:border-surface-800">
              <Lock className="w-4 h-4 text-emerald-500 mb-1.5" />
              <h3 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Zero Backend</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                No remote servers, databases, or API tracking endpoints.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-surface-900 border border-slate-200/60 dark:border-surface-800">
              <HardDrive className="w-4 h-4 text-focus mb-1.5" />
              <h3 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Local Storage Only</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                All tasks, stats, and settings reside securely in your browser.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-surface-900 border border-slate-200/60 dark:border-surface-800">
              <EyeOff className="w-4 h-4 text-cyan-500 mb-1.5" />
              <h3 className="font-bold text-xs text-slate-900 dark:text-white mb-1">No Tracking</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                No ad networks, third-party analytics, or behavioral cookies.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              1. Information We Do Not Collect
            </h3>
            <p>
              We believe privacy is a fundamental human right. When you use this Pomodoro Timer, we do <strong>not</strong> collect, process, transmit, or sell:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-500 dark:text-slate-400 pl-2">
              <li>Personally Identifiable Information (PII) such as your name, email, IP address, or location.</li>
              <li>Your task names, work sessions, or productivity habits.</li>
              <li>Browser fingerprinting information or cross-site tracking profiles.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              2. How Your Data Is Stored Locally
            </h3>
            <p>
              To give you a seamless experience across browser sessions, the application utilizes your browser’s standard <code>localStorage</code> API. This stores:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-500 dark:text-slate-400 pl-2">
              <li>Your custom timer intervals (Focus, Short Break, Long Break).</li>
              <li>Your sound choices and volume levels.</li>
              <li>Your task list and completed Pomodoro counts.</li>
              <li>Aggregated statistics (daily streaks and session counts).</li>
              <li>Appearance preferences (Light, Dark, or System mode).</li>
            </ul>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              This data remains strictly on your device. It is never transmitted across the network.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              3. Browser Notifications & Audio
            </h3>
            <p>
              Audio alerts are synthesized directly on your device using the native <strong>Web Audio API</strong> with zero external media files. 
              Desktop notifications are requested only if you explicitly enable them in Settings, and are dispatched locally by your browser.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              4. Complete Data Control & Deletion
            </h3>
            <p>
              You maintain total authority over your stored data. You can erase all session logs in the Statistics tab, reset settings to defaults in the Settings modal, or completely wipe all data by clearing your browser cache and local storage.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-surface-800 text-[11px] text-slate-400">
            Created and maintained by{' '}
            <a
              href="https://github.com/shoaibmarif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-focus font-semibold hover:underline"
            >
              Shoaib Arif
            </a>
            . Released as an open-source productivity utility.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-surface-900 border-t border-slate-100 dark:border-surface-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-focus text-white hover:bg-focus-dark shadow-sm transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
