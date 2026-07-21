import { renderToString } from "react-dom/server";

import { App } from "./App";
import type { Language } from "./I18n";
import { getRoutePath, LANGUAGE_PREFIX, ROUTE_NAME, type RouteName } from "./Routing";
import { SITE } from "./Seo";

/**
 * Renders one route, in one language, to HTML at build time.
 *
 * Both are passed in rather than read from an address: there is none under
 * Node, and falling back would put one page inside every generated file.
 */
export const render = (route: RouteName, language: Language): string =>
  renderToString(<App route={route} language={language} />);

const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];

/**
 * Every file to write, with the address it answers on.
 *
 * Taken from the routing table rather than listed again here, so a route or a
 * language added to the application is generated without anyone remembering.
 */
export const pages = LANGUAGES.flatMap((language) =>
  Object.values(ROUTE_NAME).map((route) => ({
    route,
    language,
    path: getRoutePath(route, language),
    // The not-found page is written like any other but never offered to a
    // crawler as somewhere to go: it carries `noindex`.
    listed: route !== ROUTE_NAME.NotFound,
    // Its counterpart in the other languages, for the hreflang pairs.
    alternates: LANGUAGES.map((other) => ({
      language: other,
      path: getRoutePath(route, other),
    })),
  })),
);

/** Where the site lives, so the build can write absolute addresses. */
export const site = SITE;
