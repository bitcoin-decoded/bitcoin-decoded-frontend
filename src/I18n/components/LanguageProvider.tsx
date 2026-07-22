import { useMemo } from "react";

import type { FC, ReactNode } from "react";

import { useRouterContext } from "../../Routing";

import { LanguageContext } from "./LanguageContext";

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { currentPage, language, setCurrentPage } = useRouterContext();

  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () => setCurrentPage(currentPage, language === "fr" ? "en" : "fr"),
    }),
    [language, currentPage, setCurrentPage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
