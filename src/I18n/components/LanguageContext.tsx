import { createContext } from "react";

import type { Language } from "../types";

export type LanguageContextState = {
  language: Language;
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextState>({
  language: "fr",
  toggleLanguage: () => {},
});
