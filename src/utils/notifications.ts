/**
 * Check if the browser environment supports HTML5 Notifications
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Get current notification permission state
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (err) {
    console.warn('[Notification] Failed to request permission:', err);
    return false;
  }
}

/**
 * Dispatch a notification
 */
export function sendTimerNotification(title: string, body: string): void {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return;
  }

  try {
    const options = {
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'pomodoro-timer-alert',
      renotify: true,
      silent: true, // we handle audio separately via Web Audio API
    } as NotificationOptions & { renotify?: boolean };

    const notification = new Notification(title, options as NotificationOptions);

    // Auto close notification after 8 seconds
    setTimeout(() => {
      try {
        notification.close();
      } catch {
        // ignore
      }
    }, 8000);
  } catch (err) {
    console.warn('[Notification] Failed to trigger notification:', err);
  }
}
