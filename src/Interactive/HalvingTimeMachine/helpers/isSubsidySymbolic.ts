import { getMinerWorkMinutes } from "./getMinerWorkMinutes";

const MIN_PER_YEAR = 60 * 24 * 365;
const SYMBOLIC_AFTER_YEARS = 100;

export const isSubsidySymbolic = (reward: number): boolean =>
  reward > 0 && getMinerWorkMinutes(reward) > SYMBOLIC_AFTER_YEARS * MIN_PER_YEAR;
