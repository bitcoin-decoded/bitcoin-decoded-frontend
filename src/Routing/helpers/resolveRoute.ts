import type { Language } from "../../I18n";
import { LANGUAGE_PREFIX } from "../data/LANGUAGE_PREFIX";
import { ROUTE_SLUG } from "../data/ROUTE_SLUG";
import type { RouteName } from "../types/RouteName";

import { getRoutePath } from "./getRoutePath";

export type ResolvedRoute = { route: RouteName; language: Language };

const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];

const BY_PATH = new Map<string, ResolvedRoute>();
for (const language of LANGUAGES) {
  for (const route of Object.keys(ROUTE_SLUG[language]) as RouteName[]) {
    BY_PATH.set(getRoutePath(route, language), { route, language });
  }
}

export const resolveRoute = (pathname: string): ResolvedRoute | null => {
  const trimmed = pathname.replace(/\/+$/, "");
  return BY_PATH.get(trimmed === "" ? "/" : trimmed) ?? null;
};
