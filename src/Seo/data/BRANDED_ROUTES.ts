import { ROUTE_NAME, type RouteName } from "../../Routing";

/**
 * Routes that keep the brand in their `<title>`.
 *
 * These identify the site rather than a subject, so their title means nothing
 * without it. Every chapter is deliberately absent: there the brand would only
 * push the search term out of the visible part of the result.
 */
export const BRANDED_ROUTES = new Set<RouteName>([ROUTE_NAME.HomePage, ROUTE_NAME.Badges]);
