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

/**
 * The route and language the current address points at.
 *
 * An unclaimed address resolves to the not-found page rather than quietly
 * showing the home page, which would tell a reader their link worked when it
 * did not. Its language comes from the address rather than defaulting to
 * French: the host answers every unmatched path with the one `404.html` at the
 * output root, so `/en/nawak` arrives here as a French document and only this
 * can put it back into English.
 */
const readAddress = () => {
  const { pathname } = window.location;
  return (
    resolveRoute(pathname) ?? {
      route: ROUTE_NAME.NotFound as RouteName,
      language: getLanguageFromPath(pathname),
    }
  );
};

/**
 * What to open with.
 *
 * The build renders one file per route and language under Node, where there is
 * no address to read, so it says which pair it is rendering.
 */
const initial = (route?: RouteName, language?: Language) => {
  if (route) return { route, language: language ?? "fr" };
  return isBrowser ? readAddress() : { route: ROUTE_NAME.HomePage as RouteName, language: "fr" as Language };
};

export const useRouter = (route?: RouteName, language?: Language): RouterContextState => {
  const [address, setAddress] = useState(() => initial(route, language));

  // Scrolled here, as the navigation is issued and before the next page
  // renders, rather than from an effect on the address. Effects run
  // child-first, so an effect here would fire *after* the arriving page had
  // placed itself and would silently undo it.
  const setCurrentPage = useCallback((page: RouteName, next?: Language) => {
    setAddress((current) => {
      const target = next ?? current.language;
      window.history.pushState({ page }, "", getRoutePath(page, target));
      return { route: page, language: target };
    });
    scrollToTop();
  }, []);

  // Addresses shared before paths existed still work. The fragment never
  // reaches the server, so this is the only place that can honour them, and
  // the entry is replaced rather than pushed so Back does not return to a URL
  // that would only be rewritten again.
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

  // Robustness, not the rule: left on "auto" the browser restores the previous
  // offset on reload and on back/forward, asynchronously, and would fight
  // whatever the arriving page decided.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return { currentPage: address.route, language: address.language, setCurrentPage };
};
