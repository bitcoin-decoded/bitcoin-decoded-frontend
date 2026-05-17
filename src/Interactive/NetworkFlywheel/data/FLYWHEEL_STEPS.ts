import { fmtBtc, fmtTxMin, minerRev } from "../helpers";
import type { FlywheelStepData } from "../types";

import { FEES_BTC_BY_LEVEL, TX_PER_MIN_BY_LEVEL } from ".";

const usageMetricByLevel: readonly [string, string, string, string] = [
  fmtTxMin(TX_PER_MIN_BY_LEVEL[0]),
  fmtTxMin(TX_PER_MIN_BY_LEVEL[1]),
  fmtTxMin(TX_PER_MIN_BY_LEVEL[2]),
  fmtTxMin(TX_PER_MIN_BY_LEVEL[3]),
];

const feesMetricByLevel: readonly [string, string, string, string] = [
  fmtBtc(FEES_BTC_BY_LEVEL[0], 2),
  fmtBtc(FEES_BTC_BY_LEVEL[1], 2),
  fmtBtc(FEES_BTC_BY_LEVEL[2], 2),
  fmtBtc(FEES_BTC_BY_LEVEL[3], 2),
];

const minersMetricByLevel: readonly [string, string, string, string] = [
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[0])),
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[1])),
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[2])),
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[3])),
];

export const FLYWHEEL_STEPS: readonly FlywheelStepData[] = [
  { id: 0, labelKey: "flywheel.step.usage", metricByLevel: usageMetricByLevel },
  { id: 1, labelKey: "flywheel.step.fees", metricByLevel: feesMetricByLevel },
  { id: 2, labelKey: "flywheel.step.miners", metricByLevel: minersMetricByLevel },
  {
    id: 3,
    labelKey: "flywheel.step.security",
    metricByLevel: ["200 EH/s", "350 EH/s", "550 EH/s", "800 EH/s"],
  },
  { id: 4, labelKey: "flywheel.step.value", metricByLevel: ["$200B", "$450B", "$900B", "$1 600B"] },
];
