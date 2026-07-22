import { BITCOIN_REFS } from "../../../References";

const SATOSHIS_PER_BTC = 100_000_000;
const HALVING_INTERVAL_YEARS = 4;

export const getRewardForYear = (year: number): number => {
  const SCHEDULE = BITCOIN_REFS.HALVING_SCHEDULE;
  const last = SCHEDULE[SCHEDULE.length - 1];

  if (year <= last.year) {
    let reward = SCHEDULE[0].reward;
    for (const point of SCHEDULE) {
      if (point.year <= year) reward = point.reward;
      else break;
    }
    return reward;
  }

  const steps = Math.floor((year - last.year) / HALVING_INTERVAL_YEARS);
  const satoshis = Math.floor((last.reward * SATOSHIS_PER_BTC) / 2 ** steps);
  return satoshis / SATOSHIS_PER_BTC;
};
