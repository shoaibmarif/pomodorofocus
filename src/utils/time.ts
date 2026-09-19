/**
 * Format total seconds into MM:SS format with zero padding
 */
export function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format minutes into readable duration string (e.g., "2h 15m" or "45m")
 */
export function formatDuration(totalMinutes: number): string {
  if (totalMinutes <= 0) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const mins = Math.round(totalMinutes % 60);
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Get date string in YYYY-MM-DD format for local date
 */
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if two timestamps/dates occur on the same local calendar day
 */
export function isSameDay(time1: number | Date, time2: number | Date): boolean {
  const d1 = new Date(time1);
  const d2 = new Date(time2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

/**
 * Get the previous 7 days (including today) with weekday name and YYYY-MM-DD
 */
export function getLast7Days(): { dateStr: string; dayName: string; shortDate: string }[] {
  const days: { dateStr: string; dayName: string; shortDate: string }[] = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({
      dateStr: getLocalDateString(d),
      dayName: d.toLocaleDateString(undefined, { weekday: 'short' }),
      shortDate: `${d.getMonth() + 1}/${d.getDate()}`,
    });
  }
  return days;
}
