import type { YieldConstants, YieldDataPoint } from "../types";

export const generateYieldData = (
  targetLongRate: number,
  YIELD_CONSTANTS: YieldConstants
): YieldDataPoint[] => {
  const { SHORT_RATE, MAX_TERM } = YIELD_CONSTANTS;
  const data: YieldDataPoint[] = [];

  // Le spread est la différence totale entre le taux long cible et le taux court
  const spread = targetLongRate - SHORT_RATE;

  // Facteur de normalisation pour que la courbe atteigne exactement targetLongRate à MAX_TERM
  // On utilise log(x+1) pour éviter log(0) et avoir une croissance naturelle
  const logBase = Math.log(MAX_TERM + 1);

  for (let term = 0; term <= MAX_TERM; term += 1) {
    // Calcul logarithmique pour une forme concave (rapide au début, lent à la fin)
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
