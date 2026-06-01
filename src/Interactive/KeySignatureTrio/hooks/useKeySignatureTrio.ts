import { useState } from "react";

import type { KeyElementId } from "../types";

/**
 * Selection state for the trio. Clicking a node selects it; clicking the
 * already-selected node toggles it back off. Nothing is selected initially,
 * so the diagram opens in its "invite a click" state.
 */
export const useKeySignatureTrio = () => {
  const [selectedId, setSelectedId] = useState<KeyElementId | null>(null);

  const select = (id: KeyElementId) =>
    setSelectedId((current) => (current === id ? null : id));

  const reset = () => setSelectedId(null);

  return { selectedId, select, reset, hasSelection: selectedId !== null };
};
