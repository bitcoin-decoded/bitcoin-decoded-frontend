import { BITCOIN_REFS } from "../../../References";

export const FEES_BTC_BY_LEVEL: readonly [number, number, number, number] = [
  BITCOIN_REFS.AVG_BLOCK_FEES_BTC,
  0.25,
  0.7,
  BITCOIN_REFS.PEAK_BLOCK_FEES_BTC,
];
