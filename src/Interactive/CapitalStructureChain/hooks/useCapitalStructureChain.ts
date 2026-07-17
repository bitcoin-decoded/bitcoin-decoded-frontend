import { useEffect, useRef, useState } from "react";

type Options = {
  /** Détours (upstream steps) that must be revealed to complete. 0 disables the gate. */
  requiredDetours?: number;
  /** Fired once, the moment enough détours have been traced back. */
  onComplete?: () => void;
};

export const useCapitalStructureChain = (totalSteps: number, options: Options = {}) => {
  const { requiredDetours = 0, onComplete } = options;
  const [count, setCount] = useState(1);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const handleButtonClick = () => {
    if (count < totalSteps) setCount((prev) => prev + 1);
  };

  // The first card is the final good (the sandwich); every reveal after it is
  // one production détour traced back upstream.
  const exploredDetours = count - 1;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);
  useEffect(() => {
    if (requiredDetours > 0 && !firedRef.current && exploredDetours >= requiredDetours) {
      firedRef.current = true;
      onCompleteRef.current?.();
    }
  }, [exploredDetours, requiredDetours]);

  // No button-hover state here: the shared `Button` primitive owns its own.
  return {
    count,
    exploredDetours,
    handleButtonClick,
    hoveredCardIndex,
    setHoveredCardIndex,
  };
};
