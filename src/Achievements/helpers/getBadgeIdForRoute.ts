import type { RouteName } from "../../Routing";
import { QUIZ_BADGE_BY_ROUTE } from "../data";

export const getBadgeIdForRoute = (routeId: string): string =>
  QUIZ_BADGE_BY_ROUTE[routeId as RouteName] ?? routeId;
