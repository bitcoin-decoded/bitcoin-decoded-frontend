import { BITCOIN_REFERENCE_VALUES } from "../../data";

const AVG_FEES = BITCOIN_REFERENCE_VALUES.AVERAGE_BLOCK_FEES_BTC;
const PEAK_FEES = BITCOIN_REFERENCE_VALUES.PEAK_BLOCK_FEES_BTC;

export const FEES_BTC_BY_LEVEL: readonly [number, number, number, number] = [
  AVG_FEES,
  0.25,
  0.7,
  PEAK_FEES,
];
