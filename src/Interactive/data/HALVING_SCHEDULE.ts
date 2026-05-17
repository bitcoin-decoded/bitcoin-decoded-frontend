import type { HalvingPoint } from "../types";

export const HALVING_SCHEDULE: readonly HalvingPoint[] = [
  { year: 2009, reward: 50 },
  { year: 2012, reward: 25 },
  { year: 2016, reward: 12.5 },
  { year: 2020, reward: 6.25 },
  { year: 2024, reward: 3.125 },
  { year: 2028, reward: 1.5625 },
  { year: 2032, reward: 0.78125 },
  { year: 2036, reward: 0.390625 },
  { year: 2040, reward: 0.1953125 },
];
