import { useCallback, useState } from "react";

/**
 * Single-open accordion state. At most one key is open at a time;
 * toggling the open key closes it, toggling a different key swaps it.
 * Generic over the key type so it can be reused outside the navbar
 * (any list of mutually exclusive disclosure panels).
 */
export const useAccordion = <K>(initialKey: K | null = null) => {
  const [openKey, setOpenKey] = useState<K | null>(initialKey);

  const toggle = useCallback((key: K) => {
    setOpenKey((prev) => (prev === key ? null : key));
  }, []);

  const open = useCallback((key: K) => {
    setOpenKey(key);
  }, []);

  const close = useCallback(() => {
    setOpenKey(null);
  }, []);

  const isOpen = useCallback((key: K) => openKey === key, [openKey]);

  return { openKey, toggle, open, close, isOpen };
};
