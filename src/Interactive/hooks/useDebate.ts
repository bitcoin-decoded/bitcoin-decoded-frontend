import { useState, useCallback } from "react";

type HoveredSide = { index: number; side: 0 | 1 } | null;

export const useDebate = (count: number) => {
  const [activeSides, setActiveSides] = useState<(0 | 1 | null)[]>(
    Array(count).fill(null)
  );
  const [hovered, setHovered] = useState<HoveredSide>(null);

  const selectSide = useCallback((index: number, side: 0 | 1) => {
    setActiveSides((prev) => {
      const next = [...prev];
      next[index] = prev[index] === side ? null : side;
      return next;
    });
  }, []);

  const isHovered = useCallback(
    (index: number, side: 0 | 1) =>
      hovered !== null && hovered.index === index && hovered.side === side,
    [hovered]
  );

  const hoverHandlers = useCallback(
    (index: number, side: 0 | 1) => ({
      onMouseEnter: () => setHovered({ index, side }),
      onMouseLeave: () => setHovered(null),
    }),
    []
  );

  return { activeSides, selectSide, isHovered, hoverHandlers };
};
