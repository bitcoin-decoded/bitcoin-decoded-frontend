import type { YieldConstants, YieldDataPoint } from "../types";

export const generateYieldData = (
  targetLongRate: number,
  YIELD_CONSTANTS: YieldConstants
): YieldDataPoint[] => {
  const { SHORT_RATE, MAX_TERM } = YIELD_CONSTANTS;
  const data: YieldDataPoint[] = [];

  const spread = targetLongRate - SHORT_RATE;

  const logBase = Math.log(MAX_TERM + 1);

  for (let term = 0; term <= MAX_TERM; term += 1) {
    const curveFactor = Math.log(term + 1) / logBase;
    const calculatedLongRate = SHORT_RATE + spread * curveFactor;

    data.push({
      term,
      shortRate: SHORT_RATE,
      longRate: Number(calculatedLongRate.toFixed(2)),
    });
  }

  return data;
};
