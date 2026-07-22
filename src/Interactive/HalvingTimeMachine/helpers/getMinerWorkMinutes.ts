import { BITCOIN_REFS } from "../../../References";

export const getMinerWorkMinutes = (reward: number): number => {
  const genesisReward = BITCOIN_REFS.HALVING_SCHEDULE[0].reward;
  const minPerBlock = BITCOIN_REFS.BLOCK_TIME_MIN;
  return (genesisReward / reward) * minPerBlock;
};
