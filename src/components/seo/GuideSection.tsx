import React from 'react';
import { BookOpen, Sparkles, Brain, CheckCircle2, ShieldCheck } from 'lucide-react';

export const GuideSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pick a Single Task',
      desc: 'Select a clear, actionable goal from your task list. Avoid multitasking and set a realistic target for completion.',
    },
    {
      num: '02',
      title: 'Set Timer to 25 Minutes',
      desc: 'Commit to 25 minutes of deep, uninterrupted focus. Silence notifications, close distracting tabs, and enter the zone.',
    },
    {
      num: '03',
      title: 'Work Until the Chime',
      desc: 'Immerse yourself completely in the task. If a distracting thought arises, write it down quickly and immediately return to work.',
    },
    {
      num: '04',
      title: 'Take a 5-Minute Short Break',
      desc: 'Step away from your screen. Stretch your body, hydrate, take deep breaths, or rest your eyes. Allow your brain to consolidate information.',
    },
    {
      num: '05',
      title: 'Repeat & Long Break',
      desc: 'After completing 4 consecutive focus intervals, reward yourself with an extended 15–30 minute rejuvenating break.',
    },
  ];

  const benefits = [
    {
      title: 'Beat Procrastination',
      desc: 'Overcome inertia by committing to just 25 minutes. Starting is the hardest part; timed intervals lower cognitive resistance.',
      icon: Sparkles,
    },
    {
      title: 'Sustain Deep Flow State',
      desc: 'Monotasking shields your prefrontal cortex from the high cognitive penalty of context switching and tab hopping.',
      icon: Brain,
    },
    {
      title: 'Mitigate Mental Fatigue',
      desc: 'Structured rest intervals prevent decision fatigue and burnout, keeping your energy sharp from morning to evening.',
      icon: CheckCircle2,
    },
    {
      title: 'Quantify Daily Progress',
      desc: 'Visual metrics and streak tracking provide immediate intrinsic reward, transforming abstract work into measurable accomplishment.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 mt-16 pt-12 border-t border-slate-200/60 dark:border-surface-800/80 text-slate-800 dark:text-slate-200">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-focus/10 text-focus mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Productivity Mastery</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Master the Pomodoro Technique
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Developed in the late 1980s by Francesco Cirillo, the Pomodoro Technique transforms time
          from an overwhelming enemy into a structured ally for peak cognitive performance.
        </p>
      </div>

      {/* 5-Step Visual Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-2xl font-black font-mono text-focus/40 dark:text-focus/30 block mb-2">
                {step.num}
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scientific Benefits Grid */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Why Timeboxing Delivers Proven Results
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-surface-850 border border-slate-200/80 dark:border-surface-700/60 shadow-sm flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-focus/10 text-focus flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
