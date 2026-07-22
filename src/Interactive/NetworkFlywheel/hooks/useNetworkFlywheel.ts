import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MAX_LEVEL, STEP_DELAY_MS } from "../data";
import { buildFlywheelSteps } from "../helpers";

export const useNetworkFlywheel = (onComplete?: () => void) => {
  const steps = useMemo(() => buildFlywheelSteps(), []);
  const [level, setLevel] = useState(0);
  const [stepLevels, setStepLevels] = useState<number[]>(() => steps.map(() => 0));
  const [activeStep, setActiveStep] = useState(-1);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearPending = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => clearPending, [clearPending]);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && level > 0) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [level]);

  const isAnimating = activeStep !== -1;

  const increase = useCallback(() => {
    if (isAnimating || level >= MAX_LEVEL) return;

    const next = level + 1;
    setLevel(next);

    steps.forEach((_, i) => {
      const t = setTimeout(() => {
        setActiveStep(i);
        setStepLevels((prev) => {
          const updated = [...prev];
          updated[i] = next;
          return updated;
        });
      }, i * STEP_DELAY_MS);
      timeoutsRef.current.push(t);
    });

    const tEnd = setTimeout(() => setActiveStep(-1), steps.length * STEP_DELAY_MS);
    timeoutsRef.current.push(tEnd);
  }, [isAnimating, level, steps]);

  const reset = useCallback(() => {
    clearPending();
    setLevel(0);
    setStepLevels(steps.map(() => 0));
    setActiveStep(-1);
  }, [clearPending, steps]);

  return {
    steps,
    level,
    stepLevels,
    activeStep,
    canIncrease: !isAnimating && level < MAX_LEVEL,
    increase,
    reset,
  };
};
