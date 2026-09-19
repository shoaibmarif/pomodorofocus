# 🍅 Pomodoro Focus – Production-Ready Pomodoro Timer

A modern, high-performance, and privacy-focused **Pomodoro Timer Single-Page Application (SPA)** built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. 

Designed for deep focus and sustained cognitive performance, this application features drift-free timer mechanics, native Web Audio synthesis, lightweight task management, local productivity analytics with 7-day activity charts, daily goal milestones, and complete offline PWA capabilities—with **zero backend or external data collection**.

---

## 🚀 Key Features

### ⏱️ Drift-Free Precision Timer Engine
- **Timestamp Delta Synchronization**: Calculates remaining time against the system clock (`targetEndTime - Date.now()`), completely eliminating clock throttling and drift in inactive background tabs.
- **Tab Visibility Correction**: Automatically recalculates exact time upon tab refocus.
- **Real-Time Document Title**: Displays live countdown in the browser tab (e.g., `(24:58) Focus | Pomodoro Timer`).
- **Configurable Intervals**:
  - **Focus**: Default 25 min (customizable 1–120 min)
  - **Short Break**: Default 5 min (customizable 1–60 min)
  - **Long Break**: Default 15 min (customizable 1–60 min)
  - **Sessions Before Long Break**: Default 4 (customizable 2–10)
- **Automatic Transitions & Auto-Start**: Seamless cyclic transitions with optional auto-start toggles for focus blocks and breaks.

### 🔊 Native Web Audio API Synthesizer
- **Zero External Audio Assets**: Zero HTTP requests, instant loading, and zero 404 risks.
- **4 Harmonic Sound Themes**:
  - **Chime**: Ascending 4-note chord arpeggio with smooth exponential decay.
  - **Mindfulness Bell**: Resonant bell with 4 harmonic partials.
  - **Digital Beep**: Crisp electronic double-pulse.
  - **Zen Bowl**: Low-frequency singing bowl with harmonic shimmer.
- **Mechanical Clock Tick**: Optional subtle clock ticking with independent volume slider.
- **Tactile UI Clicks**: Subtle click feedback on interactive buttons.

### 📝 Integrated Task Management
- Add tasks with custom titles and estimated Pomodoros (1–5+).
- Set an active focus task that badges directly onto the central timer interface.
- Automatically increments actual completed Pomodoro counts when a focus session ends with that task active.
- Inline task editing, completion toggle, deletion, and filter views (**All**, **Active**, **Completed**).

### 📊 Productivity Analytics & Daily Goal
- **Metrics Overview**: Today's Focus Minutes, Current Streak, Total Completed Pomodoros, Total Focus Hours, Best Streak.
- **Daily Goal Tracker**: Visual progress bar with confetti celebration when the daily target is achieved.
- **Past 7 Days Activity Chart**: Interactive SVG bar chart with daily focus minutes and session counts.
- **Session History Log**: Recent completed sessions with timestamp, duration, mode, and assigned task.

### 🔒 100% Local-First & Privacy by Design
- **No Backend, No Tracking**: Zero servers, no remote databases, and no tracking cookies or telemetry.
- **LocalStorage Persistence**: 100% of user data (timer settings, tasks, statistics, streaks, and active countdown state) is saved directly in your browser.
- **Dedicated Privacy Policy Page**: Full transparency audit of all stored keys and zero data collection guarantee at `/privacy`.

### 🎨 UI/UX Design System & Accessibility
- **Modern Dark & Light Themes**: Obsidian slate dark mode by default (`#080D1A`), clean crisp light mode, and system preference detection.
- **Circular SVG Progress Ring**: Glowing stroke-dashoffset animation wrapping the countdown.
- **Cycle Indicator Dots**: `● ● ● ○` representing session progress within the current cycle.
- **WCAG Friendly**: High contrast, visible focus states, ARIA live regions, and semantic HTML5.

### ⌨️ Global Keyboard Shortcuts
- `Space` → Start / Pause timer
- `R` → Reset current session
- `S` → Skip to next session
- `M` → Mute / Unmute audio effects
- `?` → Open Keyboard Shortcuts cheatsheet

### 📱 PWA & Offline Support
- Installable as a standalone progressive web app on Desktop, iOS, and Android.
- Offline-first caching powered by `sw.js` service worker.
- Search-engine optimized with XML sitemap (`/sitemap.xml`) and HTML sitemap (`/sitemap`).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) (Strict Mode) |
| **Bundler & Dev Server** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + PostCSS |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Audio** | Native Web Audio API (`AudioContext`) |
| **Visual Effects** | Canvas Confetti |
| **Storage** | Browser `LocalStorage` API |

---

## 📂 Project Structure

```
pomodoro-timer/
├── public/
│   ├── favicon.svg             # Vector tomato icon & PWA icon
│   ├── manifest.webmanifest    # PWA install configuration
│   ├── robots.txt              # Search engine crawler instructions
│   ├── sitemap.xml             # XML sitemap (Home, Privacy, Sitemap)
│   └── sw.js                   # Service worker for offline caching
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx      # App brand, theme switch, sound & settings controls
│   │   │   ├── Footer.tsx      # Creator attribution, social links, legal navigation
│   │   │   ├── Navigation.tsx  # Timer / Tasks / Stats pill navigation
│   │   │   ├── ThemeToggle.tsx # Light / Dark / System segmented toggle
│   │   │   └── ShortcutsModal.tsx # Hotkeys cheatsheet modal
│   │   ├── timer/
│   │   │   ├── TimerDisplay.tsx    # Central countdown timer view
│   │   │   ├── ProgressRing.tsx    # Dynamic SVG circular progress bar
│   │   │   ├── TimerControls.tsx   # Start, Pause, Reset, Skip buttons
│   │   │   ├── SessionDots.tsx     # Cycle dots indicator (● ● ● ○)
│   │   │   └── ActiveTaskBadge.tsx # Currently focused task badge
│   │   ├── tasks/
│   │   │   ├── TaskList.tsx    # Task collection with filtering and clear actions
│   │   │   ├── TaskItem.tsx    # Individual task row with edit and complete toggles
│   │   │   └── TaskInput.tsx   # Input form for adding tasks with estimated Pomodoros
│   │   ├── stats/
│   │   │   ├── Statistics.tsx      # Main analytics dashboard container
│   │   │   ├── StatsOverview.tsx   # Key metrics (today's focus, streaks, totals)
│   │   │   ├── WeeklyBarChart.tsx  # 7-day focus minutes interactive bar chart
│   │   │   ├── DailyGoalCard.tsx   # Daily target progress bar with confetti
│   │   │   └── HistoryLog.tsx      # Recent completed sessions list
│   │   ├── settings/
│   │   │   └── SettingsModal.tsx   # Intervals, sounds, volume, notifications settings
│   │   └── seo/
│   │       ├── GuideSection.tsx    # 5-step Pomodoro workflow & cognitive benefits
│   │       └── FaqAccordion.tsx    # Interactive FAQ accordion
│   ├── pages/
│   │   ├── PrivacyPage.tsx     # Dedicated standalone Privacy Policy page (/privacy)
│   │   └── SitemapPage.tsx     # Dedicated standalone HTML Sitemap page (/sitemap)
│   ├── constants/
│   │   └── defaults.ts         # Storage keys, initial states, mode configs
│   ├── hooks/
│   │   ├── usePomodoroTimer.ts # Drift-free timer state machine & persistence
│   │   ├── useLocalStorage.ts  # Type-safe storage synchronization
│   │   ├── useKeyboardShortcuts.ts # Global hotkey listeners
│   │   └── useTheme.ts         # Light/Dark/System theme engine
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces and union types
│   ├── utils/
│   │   ├── sound.ts            # Web Audio API chime, bell, and tick synthesis
│   │   ├── time.ts             # Time formatting and calendar helpers
│   │   ├── storage.ts          # Safe LocalStorage serialization
│   │   └── notifications.ts    # Web Notifications API dispatcher
│   ├── App.tsx                 # Core app orchestrator with client routing
│   ├── index.css               # Tailwind directives and custom styling
│   ├── main.tsx                # React 19 root and service worker registration
│   └── vite-env.d.ts           # Vite client environment types
├── index.html                  # SEO metadata, Open Graph, Twitter cards, JSON-LD
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended; tested on v22)
- npm or pnpm / yarn

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/shoaibmarif/pomodoro-focus.git
cd pomodoro-focus
npm install
```

### 2. Development Server
Start the local Vite development server with hot-module replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Production Build
Compile TypeScript and bundle optimized production assets:
```bash
npm run build
```

### 4. Local Preview
Preview the production build locally:
```bash
npm run preview
```

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action | Description |
| :---: | :--- | :--- |
| <kbd>Space</kbd> | **Start / Pause** | Toggle the countdown timer |
| <kbd>R</kbd> | **Reset** | Reset current session to its initial duration |
| <kbd>S</kbd> | **Skip** | Advance immediately to the next session mode |
| <kbd>M</kbd> | **Mute / Unmute** | Toggle all synthesized sound effects |
| <kbd>?</kbd> | **Shortcuts** | Open the interactive keyboard shortcuts modal |

*Note: Shortcuts are automatically suspended when typing in text inputs or textareas.*

---

## 🔒 Privacy & Data Sovereignty

This application was engineered with a **zero-backend architecture**:
* **No Remote Servers**: Zero API calls or database connections.
* **No Tracking**: No advertising cookies, tracking pixels, or third-party analytics.
* **LocalStorage Audited**: All settings, tasks, and streaks stay on your device.
* **Full Data Ownership**: Clear session history, reset settings, or wipe your browser cache at any time to purge all stored data.

Visit the dedicated [Privacy Policy](/privacy) for a detailed data audit.

---

## 👨‍💻 Creator & Attribution

Designed and developed by **Shoaib Arif**:
* **GitHub**: [@shoaibmarif](https://github.com/shoaibmarif)
* **LinkedIn**: [linkedin.com/in/shoaibmarif](https://www.linkedin.com/in/shoaibmarif/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
