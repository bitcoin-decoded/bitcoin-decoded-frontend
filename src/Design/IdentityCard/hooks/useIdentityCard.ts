import { useState } from "react";

export const useIdentityCard = (isExpandable: boolean = false) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const showContent = !isExpandable || isOpen;
  const [isExpandButtonHovered, setIsExpandButtonHovered] = useState(false);

  const toggleOpen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return {
    isHovered,
    setIsHovered,
    isOpen,
    setIsOpen,
    toggleOpen,
    showContent,
    isExpandButtonHovered,
    setIsExpandButtonHovered,
  };
};
