import { ROUTE_PATH } from "../data/ROUTE_PATH";
import type { RouteName } from "../types/RouteName";

// The inverse of ROUTE_PATH, built once. Not a dataset of its own: it holds
// nothing the table does not already say.
const BY_PATH = new Map<string, RouteName>(
  Object.entries(ROUTE_PATH).map(([route, path]) => [path, route as RouteName]),
);

/**
 * The route a URL points at, or null when no route claims it.
 *
 * A trailing slash is stripped first, so `/bitcoin/halving/` and
 * `/bitcoin/halving` are one page rather than two addresses for it.
 */
export const getRouteFromPath = (pathname: string): RouteName | null => {
  const trimmed = pathname.replace(/\/+$/, "");
  return BY_PATH.get(trimmed === "" ? "/" : trimmed) ?? null;
};
