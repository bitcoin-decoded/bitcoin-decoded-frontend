import type { Language } from "../../I18n";
import { getRoutePath, LANGUAGE_PREFIX, type RouteName } from "../../Routing";
import { SITE } from "../data";

export type Alternate = { hreflang: string; href: string };

const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];

export const buildAlternates = (route: RouteName): Alternate[] => [
  ...LANGUAGES.map((language) => ({
    hreflang: language,
    href: `${SITE.url}${getRoutePath(route, language)}`,
  })),
  { hreflang: "x-default", href: `${SITE.url}${getRoutePath(route, "fr")}` },
];
