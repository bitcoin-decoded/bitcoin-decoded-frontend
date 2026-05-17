import { useState, useCallback } from "react";

const MIN_MINERS = 100;
const MAX_MINERS = 1000;
const STEP = 100;
const BASELINE_MINERS = 400;
const BASELINE_ZEROS = 4;

export const useDifficultyAdjustment = () => {
  const [miners, setMiners] = useState(BASELINE_MINERS);

  const rawZeros = BASELINE_ZEROS + (miners - BASELINE_MINERS) / STEP;
  const zeros = Math.max(1, Math.min(11, rawZeros));
  const target = "0".repeat(zeros);

  const canDecrease = miners > MIN_MINERS;
  const canIncrease = miners < MAX_MINERS;

  const decrease = useCallback(() => setMiners((m) => Math.max(MIN_MINERS, m - STEP)), []);
  const increase = useCallback(() => setMiners((m) => Math.min(MAX_MINERS, m + STEP)), []);

  return { miners, zeros, target, canDecrease, canIncrease, decrease, increase, step: STEP };
};
