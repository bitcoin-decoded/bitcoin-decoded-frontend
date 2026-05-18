import type { HalvingPoint } from "../../Interactive/types";

export const BITCOIN_REFS = {
  AVG_BLOCK_FEES_BTC: 0.05,
  AVG_TX_PER_BLOCK: 3000,
  BLOCK_TIME_MIN: 10,
  PEAK_BLOCK_FEES_BTC: 1.5,
  TOTAL_SUPPLY_BTC: 21_000_000,
  NETWORK_HASHRATE_EH: 800,

  HALVING_SCHEDULE: [
    { year: 2009, reward: 50 },
    { year: 2012, reward: 25 },
    { year: 2016, reward: 12.5 },
    { year: 2020, reward: 6.25 },
    { year: 2024, reward: 3.125 },
    { year: 2028, reward: 1.5625 },
    { year: 2032, reward: 0.78125 },
    { year: 2036, reward: 0.390625 },
    { year: 2040, reward: 0.1953125 },
  ] as readonly HalvingPoint[],
} as const;