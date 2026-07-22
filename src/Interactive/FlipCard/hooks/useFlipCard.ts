import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useFlipCard = (onReveal?: () => void) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const flip = useCallback(() => setIsFlipped((flipped) => !flipped), []);

  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;
  useEffect(() => {
    if (isFlipped) onRevealRef.current?.();
  }, [isFlipped]);

  const hoverHandlers = useMemo(
    () => ({
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }),
    [],
  );

  return { isFlipped, isHovered, flip, hoverHandlers };
};
