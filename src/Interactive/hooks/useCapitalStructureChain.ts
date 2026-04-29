import { useState } from "react";

export const useCapitalStructureChain = (totalSteps: number) => {
  const [count, setCount] = useState(1);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const handleButtonClick = () => {
    setIsButtonHovered(false);
    if (count < totalSteps) setCount((prev) => prev + 1);
  };

  return {
    count,
    handleButtonClick,
    isButtonHovered,
    setIsButtonHovered,
    hoveredCardIndex,
    setHoveredCardIndex,
  };
};
