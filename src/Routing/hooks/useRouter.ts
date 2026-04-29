import { useState, useEffect, useCallback } from "react";
import { type RouteName } from "../types/RouteName";
import { ROUTE_NAME } from "../data/ROUTE_NAME";
import type { RouterContextState } from "../types";

const ALL_ROUTES = new Set<string>(Object.values(ROUTE_NAME));

const readHashRoute = (): RouteName => {
  const hash = window.location.hash.replace("#", "");
  return ALL_ROUTES.has(hash) ? (hash as RouteName) : (ROUTE_NAME.HomePage as RouteName);
};

export const useRouter = (): RouterContextState => {
  const [currentPage, setCurrentPageState] = useState<RouteName>(readHashRoute);

  const setCurrentPage = useCallback((page: RouteName) => {
    setCurrentPageState(page);
    const hash = page === ROUTE_NAME.HomePage ? "" : `#${page}`;
    window.history.pushState({ page }, "", `${window.location.pathname}${hash}`);
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPageState(readHashRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  return { currentPage, setCurrentPage };
};
