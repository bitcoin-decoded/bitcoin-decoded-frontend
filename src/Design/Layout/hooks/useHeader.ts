import { useState } from "react";

/** Owns the header's wordmark hover state (colour + block-scale accent). */
export const useHeader = () => {
  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);
  return { isWordmarkHovered, setIsWordmarkHovered };
};
