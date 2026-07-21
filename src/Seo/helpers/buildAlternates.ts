import type { Language } from "../../I18n";
import { getRoutePath, LANGUAGE_PREFIX, type RouteName } from "../../Routing";
import { SITE } from "../data";

export type Alternate = { hreflang: string; href: string };

const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];

/**
 * The same page's address in every language, plus the default.
 *
 * Without these, the two versions look like two unrelated pages that happen to
 * say the same thing, and a search engine picks one and drops the other as
 * duplicate. With them, it knows they are one page written twice and serves
 * whichever fits the reader.
 *
 * Every version lists every version, itself included, which the specification
 * requires: a set where one page omits another is ignored altogether.
 *
 * `x-default` names French because it is the audience the site is written for.
 * It is what a reader gets when none of the declared languages match theirs.
 */
export const buildAlternates = (route: RouteName): Alternate[] => [
  ...LANGUAGES.map((language) => ({
    hreflang: language,
    href: `${SITE.url}${getRoutePath(route, language)}`,
  })),
  { hreflang: "x-default", href: `${SITE.url}${getRoutePath(route, "fr")}` },
];
