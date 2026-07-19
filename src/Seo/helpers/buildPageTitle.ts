import { SITE } from "../data";

/**
 * The full `<title>`.
 *
 * Content pages carry no brand suffix. Roughly 60 characters survive in a
 * result page, and " · Bitcoin.Decoded" spends 18 of them on a name nobody
 * searches for yet, pushing the term the page should rank on out of view. The
 * brand is worth re-adding the day it is looked up by name.
 *
 * App pages keep it, because their title alone identifies nothing.
 */
export const buildPageTitle = (pageTitle: string, withBrand: boolean): string =>
  withBrand ? `${SITE.name} · ${pageTitle}` : pageTitle;
