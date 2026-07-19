import { SITE } from "../data";

/**
 * The full `<title>`. The brand goes last everywhere except on the home page,
 * where it is the subject rather than the suffix.
 */
export const buildPageTitle = (pageTitle: string, isHome: boolean): string =>
  isHome ? `${SITE.name} · ${pageTitle}` : `${pageTitle} · ${SITE.name}`;
