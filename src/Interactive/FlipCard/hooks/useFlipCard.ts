import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Per-card flip + hover state. One hook instance per `FlipCard`, so cards are
 * fully independent (any number can be open at once) and there is no shared
 * grid bookkeeping. No artificial click cooldown either: the CSS flip
 * transition absorbs rapid toggles on its own, always animating toward the
 * latest target. `onReveal` fires on each flip to the back face, letting a grid
 * track which cards have been explored (idempotent for callers tracking a set).
 */
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
