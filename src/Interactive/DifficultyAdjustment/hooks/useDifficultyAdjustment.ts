import { useCallback, useEffect, useRef, useState } from "react";

const MIN_MINERS = 100;
const MAX_MINERS = 1000;
const STEP = 100;
const BASELINE_MINERS = 400;
const BASELINE_ZEROS = 4;

export const useDifficultyAdjustment = (onComplete?: () => void) => {
  const [miners, setMiners] = useState(BASELINE_MINERS);

  const rawZeros = BASELINE_ZEROS + (miners - BASELINE_MINERS) / STEP;
  const zeros = Math.max(1, Math.min(11, rawZeros));
  const target = "0".repeat(zeros);

  const canDecrease = miners > MIN_MINERS;
  const canIncrease = miners < MAX_MINERS;

  const decrease = useCallback(() => setMiners((m) => Math.max(MIN_MINERS, m - STEP)), []);
  const increase = useCallback(() => setMiners((m) => Math.min(MAX_MINERS, m + STEP)), []);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && miners !== BASELINE_MINERS) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [miners]);

  return { miners, zeros, target, canDecrease, canIncrease, decrease, increase, step: STEP };
};
