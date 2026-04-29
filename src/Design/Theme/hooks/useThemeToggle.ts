import { useState } from "react";

export const useThemeToggle = () => {
  const [isHovered, setIsHovered] = useState(false);
  return {
    isHovered,
    setIsHovered,
  };
};
