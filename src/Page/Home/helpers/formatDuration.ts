// Compact, language-neutral duration: "45 min" below an hour, "2h" / "2h10"
// above (5-minute rounding). Used for the curriculum headline total.
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = Math.round((minutes % 60) / 5) * 5;
  if (rest === 60) return `${hours + 1}h`;
  return rest === 0 ? `${hours}h` : `${hours}h${String(rest).padStart(2, "0")}`;
};
