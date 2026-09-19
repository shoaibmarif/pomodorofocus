import { useState, useEffect, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (valOrFn: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return loadFromStorage<T>(key, initialValue);
  });

  const setValue = useCallback((valOrFn: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const next = typeof valOrFn === 'function' ? (valOrFn as (p: T) => T)(prev) : valOrFn;
      saveToStorage(key, next);
      return next;
    });
  }, [key]);

  // Sync if another tab modifies storage
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [storedValue, setValue];
}
