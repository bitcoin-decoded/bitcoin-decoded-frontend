import { getAverageTxPerSecond } from "../../../References";

export const getTxPerMinByLevel = (): readonly [number, number, number, number] => {
  const TX_PER_MIN = Math.round(getAverageTxPerSecond() * 60);
  return [TX_PER_MIN, TX_PER_MIN * 2, TX_PER_MIN * 4, TX_PER_MIN * 8];
};
