import { useEffect } from 'react';

interface ShortcutActions {
  onToggleStartPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onToggleMute: () => void;
  onOpenShortcuts?: () => void;
}

export function useKeyboardShortcuts({
  onToggleStartPause,
  onReset,
  onSkip,
  onToggleMute,
  onOpenShortcuts,
}: ShortcutActions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form controls
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onToggleStartPause();
          break;
        case 'KeyR':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            onReset();
          }
          break;
        case 'KeyS':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            onSkip();
          }
          break;
        case 'KeyM':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            onToggleMute();
          }
          break;
        case 'Slash':
          if (e.shiftKey && onOpenShortcuts) {
            e.preventDefault();
            onOpenShortcuts();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleStartPause, onReset, onSkip, onToggleMute, onOpenShortcuts]);
}
