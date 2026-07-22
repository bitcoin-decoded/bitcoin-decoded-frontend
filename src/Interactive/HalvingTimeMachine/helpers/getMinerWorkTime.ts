import { getMinerWorkMinutes } from "./getMinerWorkMinutes";

const MIN_PER_DAY = 60 * 24;
const MIN_PER_YEAR = MIN_PER_DAY * 365;

export const getMinerWorkTime = (reward: number, fr: boolean): string => {
  const minutes = getMinerWorkMinutes(reward);
  const nf = (n: number) => n.toLocaleString(fr ? "fr-FR" : "en-US");

  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }
  if (minutes < MIN_PER_DAY) {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    if (m === 0) return `${h} h`;
    return fr ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h ${String(m).padStart(2, "0")} min`;
  }
  if (minutes < MIN_PER_YEAR) {
    const days = Math.round(minutes / MIN_PER_DAY);
    return fr ? `${nf(days)} ${days > 1 ? "jours" : "jour"}` : `${nf(days)} ${days > 1 ? "days" : "day"}`;
  }
  const years = Math.round(minutes / MIN_PER_YEAR);
  return fr ? `${nf(years)} ans` : `${nf(years)} ${years > 1 ? "years" : "year"}`;
};
