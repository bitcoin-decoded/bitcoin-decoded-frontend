import { useMemo,useState } from "react";

import { YIELD_CONSTANTS } from "../data/";
import { generateYieldData } from "../helpers";

export const useYieldCurve = () => {
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
