import { BITCOIN_REFS } from "../data";

export const getAverageTxPerSecond = (): number =>
  BITCOIN_REFS.AVG_TX_PER_BLOCK / (BITCOIN_REFS.BLOCK_TIME_MIN * 60);
