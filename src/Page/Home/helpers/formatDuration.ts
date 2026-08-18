// Reading time, rounded to the nearest 5 minutes and switched to hours past the
// hour: 44 -> "45 min", 61 -> "1h", 130 -> "2h10". Used for the module cards and
// the curriculum headline total.
export const formatDuration = (minutes: number): string => {
  const rounded = Math.round(minutes / 5) * 5;
  if (rounded < 60) return `${rounded} min`;
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  return rest === 0 ? `${hours}h` : `${hours}h${String(rest).padStart(2, "0")}`;
};
