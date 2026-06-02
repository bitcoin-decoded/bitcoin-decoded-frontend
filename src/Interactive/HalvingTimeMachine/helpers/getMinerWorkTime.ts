import { BITCOIN_REFS } from "../../../References";

const GENESIS_REWARD = BITCOIN_REFS.HALVING_SCHEDULE[0].reward; // 50 BTC
const MIN_PER_BLOCK = BITCOIN_REFS.BLOCK_TIME_MIN; // ~10 min
const MIN_PER_DAY = 60 * 24;
const MIN_PER_YEAR = MIN_PER_DAY * 365;

/**
 * How long a miner would need to earn what a single genesis block paid (50 BTC)
 * at `reward` per block: `(50 / reward)` blocks × ~10 min. Returned as a
 * human-readable, language-aware duration that scales from minutes to years —
 * the payoff line ("…lui demande 2 h 40 de travail", and eventually millennia).
 */
export const getMinerWorkTime = (reward: number, fr: boolean): string => {
  const minutes = (GENESIS_REWARD / reward) * MIN_PER_BLOCK;
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
