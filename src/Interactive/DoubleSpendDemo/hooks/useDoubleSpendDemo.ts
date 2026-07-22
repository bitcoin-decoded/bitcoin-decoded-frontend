import { useCallback, useEffect, useRef, useState } from "react";

import { shuffleFirstSeen } from "../helpers/";
import type { DoubleSpendPhase, TxId } from "../types";

export const useDoubleSpendDemo = (onComplete?: () => void) => {
  const [phase, setPhase] = useState<DoubleSpendPhase>("broadcast");
  const [nodeFirstSeen, setNodeFirstSeen] = useState<readonly TxId[]>(() => shuffleFirstSeen());

  const reveal = useCallback(() => setPhase("propagated"), []);
  const reset = useCallback(() => {
    setNodeFirstSeen(shuffleFirstSeen());
    setPhase("broadcast");
  }, []);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && phase === "propagated") {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [phase]);

  return { phase, nodeFirstSeen, reveal, reset };
};
