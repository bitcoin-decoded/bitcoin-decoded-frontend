// `AppRouter` is deliberately absent. It maps routes to pages, so it knows
// every page, which is composition rather than routing. Exporting it here
// made `Routing` depend on `Page`, while `Page` depends on `Routing`: a cycle
// that left ROUTE_NAME undefined under any loader less forgiving than Vite.
// The shell imports it from `./Routing/components` instead.
export { RouterContext, RouterProvider }from './context';
// `getRoutePath` is public for the build, which writes one file per route and
// language, and for the canonical and hreflang tags. Application code still
// moves `RouteName` around and lets the router translate; nothing in a
// component should be assembling a URL by hand.
export { getNavigationTree, LANGUAGE_PREFIX, ROUTE_NAME, ROUTE_SLUG } from "./data";
export { getRoutePath, resolveRoute } from "./helpers";
export { useNavigationLogic,useRouterContext } from './hooks';
export type { NavigationItem,RouteName } from "./types";
