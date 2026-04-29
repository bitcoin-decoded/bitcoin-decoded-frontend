import { useMemo } from "react";
import { useRouterContext } from "./useRouterContext";
import { getNavigationTree } from "../data/NAVIGATION_TREE";
import { flattenPages } from "../helpers";
import { useTranslation } from "../../I18n";
import type { NavigationLogic } from "../types/NavigationLogic";

/**
 * Custom hook that determines the previous and next pages based on the current route.
 * It flattens the navigation tree to create a linear sequence of pages.
 */
export const useNavigationLogic = (): NavigationLogic => {
  const { currentPage } = useRouterContext();
  const { t } = useTranslation();

  const { previousPage, nextPage } = useMemo(() => {
    const tree = getNavigationTree(t);
    const pages = flattenPages(tree);
    const currentIndex = pages.findIndex((page) => page.id === currentPage);
    if (currentIndex === -1) return { previousPage: null, nextPage: null };
    const prev = pages[currentIndex - 1];
    const next = pages[currentIndex + 1];
    return {
      previousPage: prev?.id ? { id: prev.id, label: prev.label } : null,
      nextPage: next?.id ? { id: next.id, label: next.label } : null,
    };
  }, [currentPage, t]);
  return { previousPage, nextPage };
};
