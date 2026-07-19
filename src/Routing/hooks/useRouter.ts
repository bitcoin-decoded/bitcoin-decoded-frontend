import { useState, useEffect, useCallback } from "react";
import { type RouteName } from "../types/RouteName";
import { ROUTE_NAME } from "../data/ROUTE_NAME";
import type { RouterContextState } from "../types";

const ALL_ROUTES = new Set<string>(Object.values(ROUTE_NAME));

const readHashRoute = (): RouteName => {
  const hash = window.location.hash.replace("#", "");
  return ALL_ROUTES.has(hash) ? (hash as RouteName) : (ROUTE_NAME.HomePage as RouteName);
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

export const useRouter = (): RouterContextState => {
  const [currentPage, setCurrentPageState] = useState<RouteName>(readHashRoute);

  // Scrolled here — as the navigation is issued, before the next page renders —
  // rather than from an effect on `currentPage`. Effects run child-first, so an
  // effect here would fire *after* the arriving page had placed itself and would
  // silently undo it. A page that wants another anchor (a part-read chapter,
  // say) can now simply set it on mount and keep it, with nothing to race.
  const setCurrentPage = useCallback((page: RouteName) => {
    setCurrentPageState(page);
    const hash = page === ROUTE_NAME.HomePage ? "" : `#${page}`;
    window.history.pushState({ page }, "", `${window.location.pathname}${hash}`);
    scrollToTop();
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPageState(readHashRoute());
      scrollToTop();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Robustness, not the rule: left on "auto" the browser restores the previous
  // offset on reload and on back/forward, asynchronously, and would fight
  // whatever the arriving page decided. Where a chapter opens is settled by
  // `getArrivalAnchor` from its own progress — never by the browser.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return { currentPage, setCurrentPage };
};
