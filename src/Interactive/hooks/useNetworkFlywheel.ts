import { useState, useCallback, useRef, useEffect } from "react";

export type FlywheelStepData = {
  id: number;
  labelKey: string;
  metricByLevel: readonly [string, string, string, string];
};

export const FLYWHEEL_STEPS: readonly FlywheelStepData[] = [
  { id: 0, labelKey: "flywheel.step.usage",    metricByLevel: ["10 tx/min",   "40 tx/min",   "150 tx/min",  "400 tx/min"] },
  { id: 1, labelKey: "flywheel.step.fees",     metricByLevel: ["0.0001 BTC",  "0.0004 BTC",  "0.0015 BTC",  "0.005 BTC"] },
  { id: 2, labelKey: "flywheel.step.miners",   metricByLevel: ["3.125 BTC",   "3.1254 BTC",  "3.1265 BTC",  "3.130 BTC"] },
  { id: 3, labelKey: "flywheel.step.security", metricByLevel: ["200 EH/s",    "350 EH/s",    "550 EH/s",    "800 EH/s"] },
  { id: 4, labelKey: "flywheel.step.value",    metricByLevel: ["$200B",       "$450B",       "$900B",       "$1 600B"] },
];

export const MAX_LEVEL = 3;
const STEP_DELAY_MS = 380;

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
      const tEnd = setTimeout(
        () => setHighlightedStep(-1),
        FLYWHEEL_STEPS.length * STEP_DELAY_MS,
      );
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
