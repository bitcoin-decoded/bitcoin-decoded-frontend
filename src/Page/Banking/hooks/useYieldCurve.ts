import { useState, useMemo } from "react";
import { YIELD_CONSTANTS } from "../data/";
import { generateYieldData } from "../helpers";

export const useYieldCurve = () => {
  // Seul le taux long est modifiable par l'utilisateur
  const [longRate, setLongRate] = useState(4.0);
  const chartData = useMemo(
    () => generateYieldData(longRate, YIELD_CONSTANTS),
    [longRate]
  );

  return {
    longRate,
    setLongRate,
    chartData,
    fixedShortRate: YIELD_CONSTANTS.SHORT_RATE,
  };
};
