import { useCallback, useState } from "react";

/**
 * Phases of the double-spend demo:
 *  - `broadcast`  : the two contradictory transactions are visible but the
 *                   network's reaction is not yet revealed
 *  - `propagated` : nodes have each picked a "first-seen" winner based on
 *                   propagation latency — the disagreement is exposed
 */
export type DoubleSpendPhase = "broadcast" | "propagated";

export type TxId = "a" | "b";

/**
 * Returns a 4-element array assigning each node position (0..3) to the
 * transaction it saw first. Always a 2-vs-2 split — Fisher-Yates
 * shuffle of `[a, a, b, b]`. Re-rolled on every `reset()` so the reader
 * sees a different propagation pattern each run and understands that
 * no node is intrinsically "on the side" of either recipient.
 */
const shuffleFirstSeen = (): readonly TxId[] => {
  const dist: TxId[] = ["a", "a", "b", "b"];
  for (let i = dist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dist[i], dist[j]] = [dist[j], dist[i]];
  }
  return dist;
};

export const useDoubleSpend = () => {
  const [phase, setPhase] = useState<DoubleSpendPhase>("broadcast");
  const [nodeFirstSeen, setNodeFirstSeen] = useState<readonly TxId[]>(shuffleFirstSeen);

  const reveal = useCallback(() => setPhase("propagated"), []);
  const reset = useCallback(() => {
    setNodeFirstSeen(shuffleFirstSeen());
    setPhase("broadcast");
  }, []);

  return { phase, nodeFirstSeen, reveal, reset };
};
