import { useCallback, useEffect, useState } from "react";

import type { Language } from "../../I18n";
import { isBrowser } from "../../Platform";
import { ROUTE_NAME } from "../data/ROUTE_NAME";
import {
  getLanguageFromPath,
  getRouteFromLegacyHash,
  getRoutePath,
  resolveRoute,
} from "../helpers";
import type { RouterContextState } from "../types";
import { type RouteName } from "../types/RouteName";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

const readAddress = () => {
  const { pathname } = window.location;
  return (
    resolveRoute(pathname) ?? {
      route: ROUTE_NAME.NotFound as RouteName,
      language: getLanguageFromPath(pathname),
    }
  );
};

const initial = (route?: RouteName, language?: Language) => {
  if (route) return { route, language: language ?? "fr" };
  return isBrowser ? readAddress() : { route: ROUTE_NAME.HomePage as RouteName, language: "fr" as Language };
};

export const useRouter = (route?: RouteName, language?: Language): RouterContextState => {
  const [address, setAddress] = useState(() => initial(route, language));

  const setCurrentPage = useCallback((page: RouteName, next?: Language) => {
    setAddress((current) => {
      const target = next ?? current.language;
      window.history.pushState({ page }, "", getRoutePath(page, target));
      return { route: page, language: target };
    });
    scrollToTop();
  }, []);

  useEffect(() => {
    const legacy = getRouteFromLegacyHash(window.location.hash);
    if (!legacy) return;

    setAddress({ route: legacy, language: "fr" });
    window.history.replaceState({ page: legacy }, "", getRoutePath(legacy, "fr"));
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setAddress(readAddress());
      scrollToTop();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return { currentPage: address.route, language: address.language, setCurrentPage };
};
