import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MAX_LEVEL, STEP_DELAY_MS } from "../data";
import { buildFlywheelSteps } from "../helpers";

export const useNetworkFlywheel = () => {
  const [level, setLevel] = useState(0);
  const [highlightedStep, setHighlightedStep] = useState(-1);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const steps = useMemo(() => buildFlywheelSteps(), []);

  const clearPendingAnimations = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearPendingAnimations();
  }, [clearPendingAnimations]);

  const triggerAnimation = useCallback(() => {
    clearPendingAnimations();

    steps.forEach((_, i) => {
      const t = setTimeout(() => {
        setHighlightedStep(i);
      }, i * STEP_DELAY_MS);

      timeoutsRef.current.push(t);
    });

    const tEnd = setTimeout(() => {
      setHighlightedStep(-1);
    }, steps.length * STEP_DELAY_MS);

    timeoutsRef.current.push(tEnd);
  }, [clearPendingAnimations, steps]);

  const increase = useCallback(() => {
    setLevel((prev) => {
      if (prev >= MAX_LEVEL) return prev;
      return prev + 1;
    });

    triggerAnimation();
  }, [triggerAnimation]);

  const reset = useCallback(() => {
    clearPendingAnimations();
    setLevel(0);
    setHighlightedStep(-1);
  }, [clearPendingAnimations]);

  return {
    level,
    highlightedStep,
    steps,
    canIncrease: level < MAX_LEVEL,
    increase,
    reset,
  };
};
