import { useMemo, useState } from "react";

import type { FC, ReactNode } from "react";

import { readStored, writeStored } from "../../Platform";
import type { Language } from "../types";

import { LanguageContext } from "./LanguageContext";

const STORAGE_KEY = "bitcoin-decoded-language";

const getInitialLanguage = (): Language => {
  const stored = readStored(STORAGE_KEY);
  if (stored === "en" || stored === "fr") return stored;
  return "fr";
};

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      writeStored(STORAGE_KEY, next);
      return next;
    });
  };

  const value = useMemo(() => ({ language, toggleLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
