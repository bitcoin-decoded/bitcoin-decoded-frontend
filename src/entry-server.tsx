import { renderToString } from "react-dom/server";

import { App } from "./App";
import type { Language } from "./I18n";
import { getRoutePath, LANGUAGE_PREFIX, ROUTE_NAME, type RouteName } from "./Routing";
import { SITE } from "./Seo";

export const render = (route: RouteName, language: Language): string =>
  renderToString(<App route={route} language={language} />);

const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];

export const pages = LANGUAGES.flatMap((language) =>
  Object.values(ROUTE_NAME).map((route) => ({
    route,
    language,
    path: getRoutePath(route, language),
    listed: route !== ROUTE_NAME.NotFound,
    alternates: LANGUAGES.map((other) => ({
      language: other,
      path: getRoutePath(route, other),
    })),
  })),
);

export const site = SITE;
