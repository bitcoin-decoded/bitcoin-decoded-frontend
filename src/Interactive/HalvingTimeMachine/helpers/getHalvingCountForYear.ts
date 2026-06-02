import { BITCOIN_REFS } from "../../../References";

const SCHEDULE = BITCOIN_REFS.HALVING_SCHEDULE;
const HALVING_INTERVAL_YEARS = 4;

/**
 * How many halvings have already happened by `year` (0 during the genesis era,
 * 2009–2011). Within the documented schedule it's the index of the active
 * epoch; beyond it, the count keeps growing every ~4 years.
 */
export const getHalvingCountForYear = (year: number): number => {
  const lastIndex = SCHEDULE.length - 1;
  const last = SCHEDULE[lastIndex];

  if (year <= last.year) {
    let index = 0;
    for (let i = 0; i < SCHEDULE.length; i++) {
      if (SCHEDULE[i].year <= year) index = i;
      else break;
    }
    return index;
  }

  return lastIndex + Math.floor((year - last.year) / HALVING_INTERVAL_YEARS);
};
