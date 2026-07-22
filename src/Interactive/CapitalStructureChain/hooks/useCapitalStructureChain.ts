import { useEffect, useRef, useState } from "react";

type Options = {
  requiredDetours?: number;
  onComplete?: () => void;
};

export const useCapitalStructureChain = (totalSteps: number, options: Options = {}) => {
  const { requiredDetours = 0, onComplete } = options;
  const [count, setCount] = useState(1);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const handleButtonClick = () => {
    if (count < totalSteps) setCount((prev) => prev + 1);
  };

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

  return {
    count,
    exploredDetours,
    handleButtonClick,
    hoveredCardIndex,
    setHoveredCardIndex,
  };
};
