import { BITCOIN_REFS } from "../data";

export const getAverageTxFeeBTC = (): number =>
  BITCOIN_REFS.AVG_BLOCK_FEES_BTC / BITCOIN_REFS.AVG_TX_PER_BLOCK;
