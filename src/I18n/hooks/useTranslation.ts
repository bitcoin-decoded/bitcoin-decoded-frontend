import { useCallback } from "react";

import { en, fr } from "../data";

import { useLanguageContext } from "./useLanguageContext";

export type TranslationKey = keyof typeof fr;
export type TranslationFn = (key: TranslationKey) => string;

const dictionaries = { fr, en } as const;

export const useTranslation = () => {
  const { language } = useLanguageContext();

  const t: TranslationFn = useCallback((key) => dictionaries[language][key] ?? key, [language]);

  return { t, language };
};
