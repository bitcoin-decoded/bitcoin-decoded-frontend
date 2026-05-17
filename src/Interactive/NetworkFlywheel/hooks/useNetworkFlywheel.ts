import { useCallback, useEffect, useRef, useState } from "react";

import { FLYWHEEL_STEPS, MAX_LEVEL, STEP_DELAY_MS } from "../data";

export const useNetworkFlywheel = () => {
  const [level, setLevel] = useState(0);
  const [highlightedStep, setHighlightedStep] = useState(-1);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearPendingAnimations = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => () => clearPendingAnimations(), []);

  const increase = useCallback(() => {
    setLevel((prev) => {
      if (prev >= MAX_LEVEL) return prev;
      clearPendingAnimations();
      FLYWHEEL_STEPS.forEach((_, i) => {
        const t = setTimeout(() => setHighlightedStep(i), i * STEP_DELAY_MS);
        timeoutsRef.current.push(t);
      });
      const tEnd = setTimeout(() => setHighlightedStep(-1), FLYWHEEL_STEPS.length * STEP_DELAY_MS);
      timeoutsRef.current.push(tEnd);
      return prev + 1;
    });
  }, []);

  const reset = useCallback(() => {
    clearPendingAnimations();
    setLevel(0);
    setHighlightedStep(-1);
  }, []);

  return {
    level,
    highlightedStep,
    steps: FLYWHEEL_STEPS,
    canIncrease: level < MAX_LEVEL,
    increase,
    reset,
  };
};
