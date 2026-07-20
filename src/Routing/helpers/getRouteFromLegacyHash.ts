import { ROUTE_NAME } from "../data/ROUTE_NAME";
import type { RouteName } from "../types/RouteName";

const ALL_ROUTES = new Set<string>(Object.values(ROUTE_NAME));

/**
 * The route an old `#banking-3` style address pointed at, or null.
 *
 * These have to be translated in the browser. A fragment is never sent to the
 * server, so no hosting rule can ever see one, and every link or bookmark
 * shared before paths existed would otherwise land on the home page.
 */
export const getRouteFromLegacyHash = (hash: string): RouteName | null => {
  const id = hash.replace(/^#/, "");
  return ALL_ROUTES.has(id) ? (id as RouteName) : null;
};
