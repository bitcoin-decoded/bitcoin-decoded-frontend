import { useEffect, useRef, useState } from "react";

export const useIdentityCard = (isExpandable: boolean = false, onOpen?: () => void) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const showContent = !isExpandable || isOpen;
  const [isExpandButtonHovered, setIsExpandButtonHovered] = useState(false);

  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;
  useEffect(() => {
    if (isOpen) onOpenRef.current?.();
  }, [isOpen]);

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
