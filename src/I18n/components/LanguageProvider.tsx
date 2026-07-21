import { useMemo } from "react";

import type { FC, ReactNode } from "react";

import { useRouterContext } from "../../Routing";

import { LanguageContext } from "./LanguageContext";

/**
 * The language, taken from the address rather than decided here.
 *
 * It used to be stored and toggled in memory, which made one page answer in
 * two languages at one URL. A search engine cannot index the second, so each
 * version now has an address and the address is the only answer.
 *
 * Nothing is persisted and nothing redirects on arrival: sending a reader to
 * another language because of a past visit hides one version from crawlers,
 * which Google warns against. Whoever follows a link gets the language that
 * link names.
 */
export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { currentPage, language, setCurrentPage } = useRouterContext();

  const value = useMemo(
    () => ({
      language,
      // Switching language is navigation now: same chapter, other address.
      toggleLanguage: () => setCurrentPage(currentPage, language === "fr" ? "en" : "fr"),
    }),
    [language, currentPage, setCurrentPage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
