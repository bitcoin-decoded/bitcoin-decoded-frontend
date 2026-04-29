import type { FC, ReactNode } from "react";
import { useState, useMemo } from "react";
import { LanguageContext } from "./LanguageContext";
import type { Language } from "../types";

const STORAGE_KEY = "bitcoin-decoded-language";

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "fr") return stored;
  return "fr";
};

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const value = useMemo(() => ({ language, toggleLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
