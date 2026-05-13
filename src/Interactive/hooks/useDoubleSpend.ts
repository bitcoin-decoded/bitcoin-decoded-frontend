import { useCallback, useState } from "react";

/**
 * Phases of the double-spend demo:
 *  - `broadcast`  : the two contradictory transactions are visible but the
 *                   network's reaction is not yet revealed
 *  - `propagated` : nodes have each picked a "first-seen" winner based on
 *                   propagation latency — the disagreement is exposed
 */
export type DoubleSpendPhase = "broadcast" | "propagated";

export const useDoubleSpend = () => {
  const [phase, setPhase] = useState<DoubleSpendPhase>("broadcast");

  const reveal = useCallback(() => setPhase("propagated"), []);
  const reset = useCallback(() => setPhase("broadcast"), []);

  return { phase, reveal, reset };
};
