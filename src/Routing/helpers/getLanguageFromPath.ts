import type { Language } from "../../I18n";
import { LANGUAGE_PREFIX } from "../data/LANGUAGE_PREFIX";

/**
 * The language an address announces, whether or not a route claims it.
 *
 * `resolveRoute` only answers for the addresses the site writes, so it has
 * nothing to say about `/en/nawak`. Without this, every unclaimed address fell
 * back to French and an English reader who mistyped a URL was shown the
 * not-found page in a language they may not read.
 *
 * The static host cannot help here: it serves the one `404.html` at the output
 * root for every unmatched path, French included, whatever the prefix. So the
 * language is read from the address on the client, and the page corrects
 * itself. The prerendered file stays French, which costs nothing since it
 * carries `noindex`.
 */
export const getLanguageFromPath = (pathname: string): Language => {
  const prefix = LANGUAGE_PREFIX.en;
  return pathname === prefix || pathname.startsWith(`${prefix}/`) ? "en" : "fr";
};
