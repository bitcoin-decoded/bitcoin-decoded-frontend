import { useCallback, useState } from "react";

import { useExplorationGate } from "../../../Design";
import type { HoveredSide } from "../types";

type Options = {
  /** Distinct debate rows that must be opened to complete. 0 disables the gate. */
  requiredExplored?: number;
  /** Fired once enough rows have had a side revealed. */
  onComplete?: () => void;
};

export const useDebateArena = (count: number, options: Options = {}) => {
  const { requiredExplored = 0, onComplete } = options;
  const [activeSides, setActiveSides] = useState<(0 | 1 | null)[]>(Array(count).fill(null));
  const [hovered, setHovered] = useState<HoveredSide>(null);
  const { exploredCount, markExplored } = useExplorationGate({
    threshold: requiredExplored,
    onComplete,
  });

  const selectSide = useCallback(
    (index: number, side: 0 | 1) => {
      // Opening any side counts the row as explored (sticky — toggling off never un-counts it).
      markExplored(index);
      setActiveSides((prev) => {
        const next = [...prev];
        next[index] = prev[index] === side ? null : side;
        return next;
      });
    },
    [markExplored],
  );

  const isHovered = useCallback(
    (index: number, side: 0 | 1) =>
      hovered !== null && hovered.index === index && hovered.side === side,
    [hovered],
  );

  const hoverHandlers = useCallback(
    (index: number, side: 0 | 1) => ({
      onMouseEnter: () => setHovered({ index, side }),
      onMouseLeave: () => setHovered(null),
    }),
    [],
  );

  return { activeSides, selectSide, isHovered, hoverHandlers, exploredCount };
};
