// Helpers for date comparison
export function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function addUsefulDays(d: Date, days: number): Date {
  const copy = new Date(d);
  let added = 0;
  while (added < days) {
    copy.setDate(copy.getDate() + 1);
    // Skip weekends
    const day = copy.getDay();
    if (day !== 0 && day !== 6) {
      added++;
    }
  }
  return copy;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Monday-based start of week */
export function startOfWeek(date: Date): Date {
  const d = startOfDay(date);
  const day = d.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = (day + 6) % 7; // convert so Monday is 0
  d.setDate(d.getDate() - diff);
  return d;
}

export function endOfWeek(date: Date): Date {
  const start = startOfWeek(date);
  start.setDate(start.getDate() + 6);
  return start;
}

export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseISODateOnly(value: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return startOfDay(new Date(y, m - 1, d));
}