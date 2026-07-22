import { useCallback, useState } from "react";

export const useIllustration = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return {
    isHovered,
    containerHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
};
