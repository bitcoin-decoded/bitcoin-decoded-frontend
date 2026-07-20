// `AppRouter` is deliberately absent. It maps routes to pages, so it knows
// every page, which is composition rather than routing. Exporting it here
// made `Routing` depend on `Page`, while `Page` depends on `Routing`: a cycle
// that left ROUTE_NAME undefined under any loader less forgiving than Vite.
// The shell imports it from `./Routing/components` instead.
export { RouterContext, RouterProvider }from './context';
export { getNavigationTree,ROUTE_NAME } from "./data";
export { useNavigationLogic,useRouterContext } from './hooks';
export type { NavigationItem,RouteName } from "./types";
