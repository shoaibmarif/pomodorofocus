import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What is the Pomodoro Technique and why is it traditionally 25 minutes?',
      answer:
        'The Pomodoro Technique was created by Francesco Cirillo using a tomato-shaped kitchen timer ("pomodoro" in Italian). Research in cognitive psychology shows that 25 minutes is optimal for human attention: short enough to stave off boredom and mental wandering, yet long enough to sink into deep creative immersion and flow.',
    },
    {
      question: 'How does this timer prevent drift when browser tabs are inactive?',
      answer:
        'Standard JavaScript timers rely on setInterval, which modern browsers intentionally throttle down to once per minute in background tabs to conserve battery. Our application avoids this by computing remaining time using high-resolution timestamp deltas (targetEndTime - Date.now()). Whenever you switch back to the tab, the countdown is automatically recalculated to the exact millisecond.',
    },
    {
      question: 'What are recommended activities during the 5-minute and 15-minute breaks?',
      answer:
        'Use breaks to completely disengage from digital screens. Ideal short break habits include standing up, drinking a glass of water, light stretching, looking at distant objects across the room, or taking slow diaphragmatic breaths. During long breaks, enjoy a healthy snack, take a walk outdoors, or meditate.',
    },
    {
      question: 'Can I customize my session durations and break intervals?',
      answer:
        'Yes! Through the Settings modal (the gear icon at the top right), you can freely customize Focus intervals (1 to 120 minutes), Short Breaks (1 to 60 minutes), Long Breaks (1 to 60 minutes), and adjust how many focus sessions are required before triggering a long break.',
    },
    {
      question: 'Is my task list, statistics, and history private?',
      answer:
        '100% private. All tasks, session logs, streaks, and settings are stored strictly in your browser’s LocalStorage. There are no remote tracking servers, advertising cookies, or backend databases receiving your personal productivity data.',
    },
    {
      question: 'Can I install this timer as an app on my phone or computer?',
      answer:
        'Yes. This web application is built as a Progressive Web App (PWA). In Google Chrome, Microsoft Edge, or Safari, simply click "Install" or "Add to Home Screen" to run it in a standalone window with full offline capabilities.',
    },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-4 mt-12 mb-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-focus/10 text-focus mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Everything You Need to Know
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/80 dark:border-surface-700/60 bg-white dark:bg-surface-850 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-0 rounded-2xl"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-surface-800/80">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
