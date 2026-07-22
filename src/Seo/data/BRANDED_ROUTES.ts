import { ROUTE_NAME, type RouteName } from "../../Routing";

export const BRANDED_ROUTES = new Set<RouteName>([
  ROUTE_NAME.HomePage,
  ROUTE_NAME.Badges,
  ROUTE_NAME.NotFound,
]);
