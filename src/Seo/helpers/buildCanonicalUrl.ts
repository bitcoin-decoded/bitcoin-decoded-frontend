import type { Language } from "../../I18n";
import { getRoutePath, type RouteName } from "../../Routing";
import { SITE } from "../data";

export const buildCanonicalUrl = (route: RouteName, language: Language): string =>
  `${SITE.url}${getRoutePath(route, language)}`;
