import { useState } from "react";

export const useHeader = () => {
  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);
  return { isWordmarkHovered, setIsWordmarkHovered };
};
