import React, { useEffect } from 'react';
import { ArrowLeft, Map, Clock, CheckSquare, BarChart3, Sliders, BookOpen, Shield, ExternalLink } from 'lucide-react';

interface SitemapPageProps {
  onNavigateHome: () => void;
  onNavigatePrivacy: () => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigateHome, onNavigatePrivacy }) => {
  useEffect(() => {
    document.title = 'Sitemap – Pomodoro Timer';
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: 'Core Focus Timer',
      icon: Clock,
      color: 'text-focus',
      bg: 'bg-focus/10',
      links: [
        { name: 'Focus Session (25 Minutes)', desc: 'Deep work interval to achieve uninterrupted flow', action: onNavigateHome },
        { name: 'Short Break (5 Minutes)', desc: 'Brief rest interval to reset mental energy', action: onNavigateHome },
        { name: 'Long Break (15 Minutes)', desc: 'Extended recovery after 4 completed focus cycles', action: onNavigateHome },
        { name: 'Synthesized Web Audio Alarms', desc: 'Native browser sounds: Chime, Bell, Digital, and Zen Bowl', action: onNavigateHome },
      ],
    },
    {
      title: 'Task Management',
      icon: CheckSquare,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      links: [
        { name: 'Task List & Prioritization', desc: 'Create, organize, and assign tasks for active sessions', action: onNavigateHome },
        { name: 'Estimated vs Actual Pomodoros', desc: 'Track estimated effort against actual completed blocks', action: onNavigateHome },
        { name: 'Task Filtering', desc: 'View All, Active, or Completed tasks with one click', action: onNavigateHome },
      ],
    },
    {
      title: 'Productivity Analytics',
      icon: BarChart3,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      links: [
        { name: "Today's Focus Overview", desc: 'Real-time calculation of completed sessions and total minutes', action: onNavigateHome },
        { name: 'Daily Streak Tracker', desc: 'Visual consecutive day tracking with best streak records', action: onNavigateHome },
        { name: 'Past 7 Days Activity Chart', desc: 'Interactive bar visualization of daily focus minutes', action: onNavigateHome },
        { name: 'Session History Log', desc: 'Detailed timestamped audit of past completed focus intervals', action: onNavigateHome },
        { name: 'Daily Goal Progress', desc: 'Configurable daily target with celebratory milestones', action: onNavigateHome },
      ],
    },
    {
      title: 'Settings & Preferences',
      icon: Sliders,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      links: [
        { name: 'Custom Timer Intervals', desc: 'Customize focus from 1–120 min and breaks from 1–60 min', action: onNavigateHome },
        { name: 'Audio & Ticking Controls', desc: 'Volume sliders, ticking audio, and sound theme selectors', action: onNavigateHome },
        { name: 'Desktop Notifications', desc: 'Native system alerts when intervals complete', action: onNavigateHome },
        { name: 'Theme Switcher', desc: 'Seamless toggle between Dark Mode, Light Mode, and System theme', action: onNavigateHome },
        { name: 'Keyboard Shortcuts', desc: 'Fast hotkeys (Space, R, S, M, ?) for effortless control', action: onNavigateHome },
      ],
    },
    {
      title: 'Guides & FAQ',
      icon: BookOpen,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      links: [
        { name: 'What is the Pomodoro Technique?', desc: 'Origin, methodology, and philosophy of Francesco Cirillo', action: onNavigateHome },
        { name: '5-Step Productivity Workflow', desc: 'Step-by-step framework to maximize daily output', action: onNavigateHome },
        { name: 'Cognitive Science of Timeboxing', desc: 'Why timed focus blocks mitigate burnout and context switching', action: onNavigateHome },
        { name: 'Frequently Asked Questions', desc: 'Detailed Q&A on drift prevention, break activities, and offline usage', action: onNavigateHome },
      ],
    },
    {
      title: 'Legal, Meta & Source',
      icon: Shield,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      links: [
        { name: 'Privacy Policy', desc: '100% local-first data architecture, zero cookies, zero tracking', action: onNavigatePrivacy },
        { name: 'XML Sitemap', desc: 'Machine-readable search engine index file (/sitemap.xml)', externalUrl: '/sitemap.xml' },
        { name: 'Creator Profile (LinkedIn)', desc: 'Connect with developer Shoaib Arif on LinkedIn', externalUrl: 'https://www.linkedin.com/in/shoaibmarif/' },
        { name: 'Source Repository (GitHub)', desc: 'Explore open-source codebase on GitHub', externalUrl: 'https://github.com/shoaibmarif' },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-surface-850/80 hover:bg-slate-100 dark:hover:bg-surface-800 border border-slate-200/80 dark:border-surface-700/60 shadow-sm transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Timer</span>
        </button>

        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-focus hover:underline flex items-center gap-1"
        >
          <span>View sitemap.xml</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-focus/10 text-focus mb-3 border border-focus/20">
          <Map className="w-4 h-4" />
          <span>Website Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Application Sitemap
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Comprehensive overview of all tools, features, productivity modules, settings, and documentation available in the Pomodoro Timer application.
        </p>
      </div>

      {/* Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-2xl ${sec.bg} ${sec.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {sec.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {sec.links.map((link, lIdx) => (
                    <div key={lIdx} className="group">
                      {link.externalUrl ? (
                        <a
                          href={link.externalUrl}
                          target={link.externalUrl.startsWith('http') ? '_blank' : undefined}
                          rel={link.externalUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-surface-900/60 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-focus transition-colors">
                              {link.name}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-focus" />
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {link.desc}
                          </p>
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={link.action}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-surface-900/60 transition-colors"
                        >
                          <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-focus transition-colors block">
                            {link.name}
                          </span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {link.desc}
                          </p>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Return to App Button */}
      <div className="mt-8 text-center">
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
