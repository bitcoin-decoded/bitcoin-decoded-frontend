import { useCallback, useState } from "react";

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
