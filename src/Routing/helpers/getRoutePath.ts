import type { Language } from "../../I18n";
import { LANGUAGE_PREFIX } from "../data/LANGUAGE_PREFIX";
import { ROUTE_SLUG } from "../data/ROUTE_SLUG";
import type { RouteName } from "../types/RouteName";

export const getRoutePath = (route: RouteName, language: Language): string => {
  const prefix = LANGUAGE_PREFIX[language];
  const slug = ROUTE_SLUG[language][route];

  if (slug === "/") return prefix === "" ? "/" : prefix;
  return `${prefix}${slug}`;
};
