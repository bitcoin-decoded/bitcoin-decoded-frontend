import type { Language } from "../../I18n";

/**
 * What each language puts in front of a path.
 *
 * French is the audience, so it takes the root and its addresses stay the
 * shortest. English is prefixed. Stated once here rather than repeated inside
 * twenty-six English slugs, so moving French under `/fr` one day is one line.
 */
export const LANGUAGE_PREFIX: Record<Language, string> = {
  fr: "",
  en: "/en",
};
