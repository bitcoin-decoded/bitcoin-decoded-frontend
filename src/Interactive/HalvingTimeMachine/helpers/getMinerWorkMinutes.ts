import { BITCOIN_REFS } from "../../../References";

/**
 * Minutes a miner would need to earn what a single genesis block paid (50 BTC)
 * at `reward` per block: `(50 / reward)` blocks × ~10 min. Shared by the
 * work-time label and the "subsidy has become symbolic" threshold.
 */
export const getMinerWorkMinutes = (reward: number): number => {
  // Read on call, not on import: dereferencing an imported binding at module
  // level is what turns an import cycle from harmless into fatal.
  const genesisReward = BITCOIN_REFS.HALVING_SCHEDULE[0].reward; // 50 BTC
  const minPerBlock = BITCOIN_REFS.BLOCK_TIME_MIN; // ~10 min
  return (genesisReward / reward) * minPerBlock;
};
