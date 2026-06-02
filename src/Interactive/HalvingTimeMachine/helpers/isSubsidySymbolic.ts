import { getMinerWorkMinutes } from "./getMinerWorkMinutes";

const MIN_PER_YEAR = 60 * 24 * 365;
const SYMBOLIC_AFTER_YEARS = 100;

/**
 * Once earning what a 2009 block paid would take a miner more than a century of
 * work, the subsidy is effectively symbolic — comparing it to 2009 stops being
 * meaningful, and transaction fees are what keep the network secured.
 */
export const isSubsidySymbolic = (reward: number): boolean =>
  reward > 0 && getMinerWorkMinutes(reward) > SYMBOLIC_AFTER_YEARS * MIN_PER_YEAR;
