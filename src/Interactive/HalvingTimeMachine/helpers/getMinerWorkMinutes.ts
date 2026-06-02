import { BITCOIN_REFS } from "../../../References";

const GENESIS_REWARD = BITCOIN_REFS.HALVING_SCHEDULE[0].reward; // 50 BTC
const MIN_PER_BLOCK = BITCOIN_REFS.BLOCK_TIME_MIN; // ~10 min

/**
 * Minutes a miner would need to earn what a single genesis block paid (50 BTC)
 * at `reward` per block: `(50 / reward)` blocks × ~10 min. Shared by the
 * work-time label and the "subsidy has become symbolic" threshold.
 */
export const getMinerWorkMinutes = (reward: number): number =>
  (GENESIS_REWARD / reward) * MIN_PER_BLOCK;
