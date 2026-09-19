import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../constants/defaults';
import { ThemeMode } from '../types';

export function useTheme(): [ThemeMode, (mode: ThemeMode) => void, boolean] {
  const [theme, setTheme] = useLocalStorage<ThemeMode>(STORAGE_KEYS.THEME, 'dark');

  const getIsDark = (mode: ThemeMode): boolean => {
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const isDark = getIsDark(theme);

  useEffect(() => {
    const root = document.documentElement;
    const metaThemeColor = document.getElementById('theme-color-meta');

    if (isDark) {
      root.classList.add('dark');
      metaThemeColor?.setAttribute('content', '#080D1A');
    } else {
      root.classList.remove('dark');
      metaThemeColor?.setAttribute('content', '#F8FAFC');
    }

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.add('dark');
          metaThemeColor?.setAttribute('content', '#080D1A');
        } else {
          root.classList.remove('dark');
          metaThemeColor?.setAttribute('content', '#F8FAFC');
        }
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme, isDark]);

  return [theme, setTheme, isDark];
}
