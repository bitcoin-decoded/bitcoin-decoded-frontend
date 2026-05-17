import { useCallback, useRef, useState } from "react";

const COOLDOWN = 1000;

export const useFlipCard = () => {
  const [flippedSet, setFlippedSet] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lockedRef = useRef(false);

  const toggleFlip = useCallback((index: number) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setTimeout(() => (lockedRef.current = false), COOLDOWN);

    setFlippedSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const hoverHandlers = useCallback(
    (index: number) => ({
      onMouseEnter: () => setHoveredIndex(index),
      onMouseLeave: () => setHoveredIndex(null),
    }),
    [],
  );

  return { flippedSet, toggleFlip, hoveredIndex, hoverHandlers };
};
