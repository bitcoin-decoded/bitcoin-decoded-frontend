// The distinct-calendar-day tally behind the backup reminder (CDC v1.3 §7.6): a
// day not seen before bumps the count, a repeat of the same day leaves it be — so
// three reloads in one afternoon count as one, three days of real use count as
// three. Pure (the clock is passed in as `today`) so it is testable.
export const nextActiveDays = (
  storedDays: number,
  lastDay: string | null,
  today: string,
): { days: number; isNewDay: boolean } => {
  const base = Number.isFinite(storedDays) && storedDays > 0 ? Math.floor(storedDays) : 0;
  return lastDay === today ? { days: base, isNewDay: false } : { days: base + 1, isNewDay: true };
};
