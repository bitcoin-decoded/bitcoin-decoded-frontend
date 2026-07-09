import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  threshold: number;
  onComplete?: () => void;
};

export const useExplorationGate = ({ threshold, onComplete }: Options) => {
  const [explored, setExplored] = useState<ReadonlySet<number>>(new Set());
  const exploredCount = explored.size;

  const markExplored = useCallback((id: number) => {
    setExplored((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  // `done` flips false→true exactly once (the set only grows, threshold is
  // fixed), so an effect keyed on it fires onComplete a single time — no
  // fire-once ref needed. The ref only keeps onComplete out of the deps so a
  // new callback identity each render can't re-trigger it.
  const done = threshold > 0 && exploredCount >= threshold;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  useEffect(() => {
    if (done) onCompleteRef.current?.();
  }, [done]);

  return { exploredCount, markExplored };
};
