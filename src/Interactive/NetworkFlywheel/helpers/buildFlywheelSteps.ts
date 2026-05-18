import { FEES_BTC_BY_LEVEL } from "../data";
import type { FlywheelStepData } from "../types";

import { fmtBtc, fmtTxMin, getTxPerMinByLevel, minerRev } from ".";

export const buildFlywheelSteps = (): readonly FlywheelStepData[] => {
  const txPerMinByLevel = getTxPerMinByLevel();

  const map4 = <T>(fn: (index: 0 | 1 | 2 | 3) => T): readonly [T, T, T, T] => [
    fn(0),
    fn(1),
    fn(2),
    fn(3),
  ];

  return [
    {
      id: 0,
      labelKey: "flywheel.step.usage",
      metricByLevel: map4((i) => fmtTxMin(txPerMinByLevel[i])),
    },
    {
      id: 1,
      labelKey: "flywheel.step.fees",
      metricByLevel: map4((i) => fmtBtc(FEES_BTC_BY_LEVEL[i], 2)),
    },
    {
      id: 2,
      labelKey: "flywheel.step.miners",
      metricByLevel: map4((i) => fmtBtc(minerRev(FEES_BTC_BY_LEVEL[i]))),
    },
    {
      id: 3,
      labelKey: "flywheel.step.security",
      metricByLevel: ["200 EH/s", "350 EH/s", "550 EH/s", "800 EH/s"] as const,
    },
    {
      id: 4,
      labelKey: "flywheel.step.value",
      metricByLevel: ["$200B", "$450B", "$900B", "$1 600B"] as const,
    },
  ];
};
