import { useState } from "react";

import type { KeyElementId } from "../types";

/**
 * Selection + exploration state for the trio. Clicking a node selects it
 * (clicking the selected one toggles it back off) and, the first time it is
 * opened, marks it as explored. `exploredCount` only ever grows — it powers
 * the discreet "n/3 explored" progress counter and never gates the chapter.
 */
export const useKeySignatureTrio = () => {
  const [selectedId, setSelectedId] = useState<KeyElementId | null>(null);
  const [explored, setExplored] = useState<ReadonlySet<KeyElementId>>(new Set());

  const select = (id: KeyElementId) => {
    setExplored((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    setSelectedId((current) => (current === id ? null : id));
  };

  const reset = () => setSelectedId(null);

  return {
    selectedId,
    select,
    reset,
    hasSelection: selectedId !== null,
    exploredCount: explored.size,
  };
};
