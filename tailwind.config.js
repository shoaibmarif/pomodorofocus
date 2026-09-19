/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        focus: {
          light: '#F87171',
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          glow: 'rgba(239, 68, 68, 0.35)',
        },
        shortBreak: {
          light: '#34D399',
          DEFAULT: '#10B981',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.35)',
        },
        longBreak: {
          light: '#38BDF8',
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
          glow: 'rgba(6, 182, 212, 0.35)',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          700: '#334155',
          800: '#1E293B',
          850: '#161F30',
          900: '#0F172A',
          950: '#080D1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-focus': '0 0 35px -5px rgba(239, 68, 68, 0.45)',
        'glow-short': '0 0 35px -5px rgba(16, 185, 129, 0.45)',
        'glow-long': '0 0 35px -5px rgba(6, 182, 212, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
