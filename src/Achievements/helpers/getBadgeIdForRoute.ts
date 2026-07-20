import type { RouteName } from "../../Routing";
import { QUIZ_BADGE_BY_ROUTE } from "../data";

/**
 * The badge that marks a route as done.
 *
 * A chapter's badge is its own route name; a quiz's is its module's trophy.
 * Both questions have one answer here, so no caller has to know which kind of
 * page it is holding.
 */
export const getBadgeIdForRoute = (routeId: string): string =>
  QUIZ_BADGE_BY_ROUTE[routeId as RouteName] ?? routeId;
