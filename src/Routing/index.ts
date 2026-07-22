// `AppRouter` is absent on purpose: exporting it here makes Routing depend on
// Page, which already depends on Routing, and the cycle leaves ROUTE_NAME
// undefined under any loader less forgiving than Vite.
export { RouterContext, RouterProvider }from './context';
export { getNavigationTree, LANGUAGE_PREFIX, ROUTE_NAME, ROUTE_SLUG } from "./data";
export { getRoutePath, resolveRoute } from "./helpers";
export { useNavigationLogic,useRouterContext } from './hooks';
export type { NavigationItem,RouteName } from "./types";
