import { useEffect, useRef, useState } from "react";

import type { KeyElementId } from "../types";

type Options = {
  requiredExplored?: number;
  onComplete?: () => void;
};

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
