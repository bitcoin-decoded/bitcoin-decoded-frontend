import type { Language } from "../../I18n";
import { LANGUAGE_PREFIX } from "../data/LANGUAGE_PREFIX";
import { ROUTE_SLUG } from "../data/ROUTE_SLUG";
import type { RouteName } from "../types/RouteName";

/**
 * The address a route answers on, in one language.
 *
 * The home page is the one slug the prefix cannot simply be glued to: French
 * gives "/", and English must give "/en" rather than "/en/", so the two
 * versions of the front page are one address each.
 */
export const getRoutePath = (route: RouteName, language: Language): string => {
  const prefix = LANGUAGE_PREFIX[language];
  const slug = ROUTE_SLUG[language][route];

  if (slug === "/") return prefix === "" ? "/" : prefix;
  return `${prefix}${slug}`;
};
