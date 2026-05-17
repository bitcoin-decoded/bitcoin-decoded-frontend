import { useCallback, useState } from "react";

import { shuffleFirstSeen } from "../helpers/";
import type { DoubleSpendPhase, TxId } from "../types";

export const useDoubleSpendDemo = () => {
  const [phase, setPhase] = useState<DoubleSpendPhase>("broadcast");
  const [nodeFirstSeen, setNodeFirstSeen] = useState<readonly TxId[]>(() => shuffleFirstSeen());

  const reveal = useCallback(() => setPhase("propagated"), []);
  const reset = useCallback(() => {
    setNodeFirstSeen(shuffleFirstSeen());
    setPhase("broadcast");
  }, []);

  return { phase, nodeFirstSeen, reveal, reset };
};
