import { useEffect, useRef, useState } from "react";

import type { KeyElementId } from "../types";

type Options = {
  /** Distinct nodes that must be opened to complete. 0 disables the gate. */
  requiredExplored?: number;
  /** Fired once every required node has been explored. */
  onComplete?: () => void;
};

/**
 * Selection + exploration state for the trio. Clicking a node selects it
 * (clicking the selected one toggles it back off) and, the first time it is
 * opened, marks it as explored. `exploredCount` only ever grows - it powers
 * the discreet "n/3 explored" progress counter. When `requiredExplored > 0`
 * it also gates the surrounding tool block (fires `onComplete` once at the
 * threshold).
 */
export const useKeySignatureTrio = ({ requiredExplored = 0, onComplete }: Options = {}) => {
  const [selectedId, setSelectedId] = useState<KeyElementId | null>(null);
  const [explored, setExplored] = useState<ReadonlySet<KeyElementId>>(new Set());

  const select = (id: KeyElementId) => {
    setExplored((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    setSelectedId((current) => (current === id ? null : id));
  };

  const reset = () => setSelectedId(null);

  const exploredCount = explored.size;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (!firedRef.current && requiredExplored > 0 && exploredCount >= requiredExplored) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [exploredCount, requiredExplored]);

  return {
    selectedId,
    select,
    reset,
    hasSelection: selectedId !== null,
    exploredCount,
  };
};
