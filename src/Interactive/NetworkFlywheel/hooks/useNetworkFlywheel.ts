import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MAX_LEVEL, STEP_DELAY_MS } from "../data";
import { buildFlywheelSteps } from "../helpers";

/**
 * Drives the self-reinforcing cycle. The key behaviour: a click does NOT bump
 * every metric at once. Instead each step keeps its own displayed level
 * (`stepLevels`) and the new level propagates one step at a time, in sync with
 * the highlight wave (`activeStep`) — so the user literally watches usage push
 * fees, fees push miner revenue, and so on around the loop.
 */
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

  // Fires once the reader has turned the wheel at least once (the action this
  // block is built around). One-shot — resetting never re-fires.
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

    // Propagate the new level through the cycle, one step per tick.
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
