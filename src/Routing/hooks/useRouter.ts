import { useCallback, useEffect, useState } from "react";

import { ROUTE_NAME } from "../data/ROUTE_NAME";
import { ROUTE_PATH } from "../data/ROUTE_PATH";
import { getRouteFromLegacyHash, getRouteFromPath } from "../helpers";
import type { RouterContextState } from "../types";
import { type RouteName } from "../types/RouteName";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

/**
 * The route the current address points at.
 *
 * An unclaimed address resolves to the not-found page rather than quietly
 * showing the home page, which would tell a reader their link worked when it
 * did not, and would tell a crawler that every typo is a real page.
 *
 * The response is still 200: a static host serving one HTML file for every path
 * cannot vary the status. What keeps that from being an indexable soft 404 is
 * the `noindex` the page carries (see `Seo`).
 */
const readRoute = (): RouteName =>
  getRouteFromPath(window.location.pathname) ?? ROUTE_NAME.NotFound;

export const useRouter = (): RouterContextState => {
  const [currentPage, setCurrentPageState] = useState<RouteName>(readRoute);

  // Scrolled here, as the navigation is issued and before the next page
  // renders, rather than from an effect on `currentPage`. Effects run
  // child-first, so an effect here would fire *after* the arriving page had
  // placed itself and would silently undo it. A page that wants another anchor
  // (a part-read chapter, say) can set it on mount and keep it, with nothing to
  // race.
  const setCurrentPage = useCallback((page: RouteName) => {
    setCurrentPageState(page);
    window.history.pushState({ page }, "", ROUTE_PATH[page]);
    scrollToTop();
  }, []);

  // Addresses shared before paths existed still work. The fragment never
  // reaches the server, so this is the only place that can honour them, and the
  // entry is replaced rather than pushed so Back does not return to a URL that
  // would only be rewritten again.
  useEffect(() => {
    const legacy = getRouteFromLegacyHash(window.location.hash);
    if (!legacy) return;

    setCurrentPageState(legacy);
    window.history.replaceState({ page: legacy }, "", ROUTE_PATH[legacy]);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPageState(readRoute());
      scrollToTop();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Robustness, not the rule: left on "auto" the browser restores the previous
  // offset on reload and on back/forward, asynchronously, and would fight
  // whatever the arriving page decided. Where a chapter opens is settled by
  // `getArrivalAnchor` from its own progress, never by the browser.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return { currentPage, setCurrentPage };
};
