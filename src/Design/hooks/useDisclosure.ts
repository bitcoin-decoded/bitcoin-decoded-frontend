import { useCallback, useState } from "react";

/**
 * Generic disclosure (open/close) state - useful for collapsible panels,
 * accordion items, dropdowns, etc.
 */
export const useDisclosure = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  return { isOpen, open, close, toggle };
};
