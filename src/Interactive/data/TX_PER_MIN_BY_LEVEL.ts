import { BITCOIN_REFERENCE_VALUES } from "./ECONOMIC_REFERENCE";

const TX_PER_MIN = Math.round(BITCOIN_REFERENCE_VALUES.AVERAGE_TX_PER_SECOND * 60);

export const TX_PER_MIN_BY_LEVEL: readonly [number, number, number, number] = [
  TX_PER_MIN,
  TX_PER_MIN * 2,
  TX_PER_MIN * 4,
  TX_PER_MIN * 8,
];
