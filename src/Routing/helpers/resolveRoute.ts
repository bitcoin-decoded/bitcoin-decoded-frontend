import type { Language } from "../../I18n";
import { LANGUAGE_PREFIX } from "../data/LANGUAGE_PREFIX";
import { ROUTE_SLUG } from "../data/ROUTE_SLUG";
import type { RouteName } from "../types/RouteName";

import { getRoutePath } from "./getRoutePath";

export type ResolvedRoute = { route: RouteName; language: Language };

const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];

// Every address the site answers on, built once from the same table that
// produces them, so a path can never resolve to something the site would not
// have written.
const BY_PATH = new Map<string, ResolvedRoute>();
for (const language of LANGUAGES) {
  for (const route of Object.keys(ROUTE_SLUG[language]) as RouteName[]) {
    BY_PATH.set(getRoutePath(route, language), { route, language });
  }
}

/**
 * The route and language an address points at, or null when none claims it.
 *
 * A trailing slash is stripped first, so `/en/bitcoin/halving/` and
 * `/en/bitcoin/halving` are one page rather than two addresses for it.
 */
export const resolveRoute = (pathname: string): ResolvedRoute | null => {
  const trimmed = pathname.replace(/\/+$/, "");
  return BY_PATH.get(trimmed === "" ? "/" : trimmed) ?? null;
};
