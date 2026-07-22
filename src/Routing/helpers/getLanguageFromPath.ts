import type { Language } from "../../I18n";
import { LANGUAGE_PREFIX } from "../data/LANGUAGE_PREFIX";

// The host answers every unmatched path with the single French 404.html, so
// an English reader who mistypes can only be put back into English here.
export const getLanguageFromPath = (pathname: string): Language => {
  const prefix = LANGUAGE_PREFIX.en;
  return pathname === prefix || pathname.startsWith(`${prefix}/`) ? "en" : "fr";
};
