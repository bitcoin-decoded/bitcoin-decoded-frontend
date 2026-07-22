import { useEffect, useRef, useState } from "react";

import type { ComparisonPhase } from "../types";

export const useTransactionComparison = (onComplete?: () => void) => {
  const [phase, setPhase] = useState<ComparisonPhase>("before");

  const trigger = () => setPhase("after");
  const reset = () => setPhase("before");

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && phase === "after") {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [phase]);

  return { phase, trigger, reset };
};
