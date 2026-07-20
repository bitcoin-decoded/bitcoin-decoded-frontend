import { BITCOIN_REFS } from "../../../References";

const SATOSHIS_PER_BTC = 100_000_000;
const HALVING_INTERVAL_YEARS = 4;

/**
 * Block subsidy (in BTC) in effect during `year`.
 *
 * Within the documented schedule (genesis → 2040) the value comes straight from
 * BITCOIN_REFS.HALVING_SCHEDULE, so it stays consistent with the HalvingChart.
 * Beyond it, the protocol rule is applied - halve every ~4 years - flooring to
 * whole satoshis, which naturally drives the subsidy to exactly 0 around 2140.
 */
export const getRewardForYear = (year: number): number => {
  // Read inside the function, not at module level: dereferencing an imported
  // binding on import is what turns a cycle from harmless into fatal.
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
