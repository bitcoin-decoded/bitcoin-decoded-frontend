import { ROUTE_NAME } from "../data/ROUTE_NAME";
import type { RouteName } from "../types/RouteName";

const ALL_ROUTES = new Set<string>(Object.values(ROUTE_NAME));

export const getRouteFromLegacyHash = (hash: string): RouteName | null => {
  const id = hash.replace(/^#/, "");
  return ALL_ROUTES.has(id) ? (id as RouteName) : null;
};
