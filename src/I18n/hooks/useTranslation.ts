import { useCallback } from "react";

import { en, fr } from "../data";
import { fixFrenchPunctuation } from "../helpers";
import type { Language } from "../types";

import { useLanguageContext } from "./useLanguageContext";

export type TranslationKey = keyof typeof fr;
export type TranslationFn = (key: TranslationKey) => string;

const dictionaries = { fr, en } as const;

export const useTranslation = (): { t: TranslationFn; language: Language } => {
  const { language } = useLanguageContext();

  const t: TranslationFn = useCallback(
    (key) => {
      const raw = dictionaries[language][key] ?? key;
      return language === "fr" ? fixFrenchPunctuation(raw) : raw;
    },
    [language],
  );

  return { t, language };
};
