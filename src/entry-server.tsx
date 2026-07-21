import { renderToString } from "react-dom/server";

import { App } from "./App";
import { ROUTE_NAME, ROUTE_PATH, type RouteName } from "./Routing";
import { SITE } from "./Seo";

/**
 * Renders one route to HTML at build time.
 *
 * The route is passed in rather than read from an address: there is none under
 * Node, and falling back to the home page would put the home page inside every
 * generated file.
 */
export const render = (route: RouteName): string => renderToString(<App route={route} />);

/**
 * Every route to write out, with the address it answers on.
 *
 * Taken from `ROUTE_PATH` rather than listed again here, so a route added to
 * the application is generated without anyone remembering to add it.
 */
export const pages = Object.values(ROUTE_NAME).map((route) => ({
  route,
  path: ROUTE_PATH[route],
  // The not-found page carries `noindex`, so it is written out like any other
  // page but never offered to a crawler as somewhere to go.
  listed: route !== ROUTE_NAME.NotFound,
}));

/** Where the site lives, so the build can write absolute addresses. */
export const site = SITE;
