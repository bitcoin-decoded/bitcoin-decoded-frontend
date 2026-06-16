import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /** Number of distinct items that must be explored to complete. */
  threshold: number;
  /** Fired exactly once, the moment the explored count reaches `threshold`. */
  onComplete?: () => void;
};

/**
 * Tracks how many distinct items a reader has opened/explored and fires
 * `onComplete` once when the count reaches `threshold`. Powers the "n/N
 * explored" gate on block-reading tool blocks (e.g. the monetary gallery):
 * the explored set only ever grows, so revisiting an item never re-counts it
 * and going back never un-gates the block.
 */
export const useExplorationGate = ({ threshold, onComplete }: Options) => {
  const [explored, setExplored] = useState<ReadonlySet<number>>(new Set());

  const markExplored = useCallback((id: number) => {
    setExplored((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const exploredCount = explored.size;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && threshold > 0 && exploredCount >= threshold) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [exploredCount, threshold]);

  return { exploredCount, markExplored };
};
