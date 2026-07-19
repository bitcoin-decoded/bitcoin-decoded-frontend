import type { NavigationItem, RouteName } from "../../Routing";

import { getModuleFrontier } from "./getModuleFrontier";

/**
 * A chapter is locked when it sits past its module's frontier. Chapter 01 of
 * every module is open from the start, and no module ever gates another.
 */
export const isChapterLocked = (
  tree: NavigationItem[],
  isSealed: (id: RouteName) => boolean,
  routeId: RouteName,
): boolean => {
  const frontier = getModuleFrontier(tree, isSealed, routeId);
  if (!frontier) return false;

  return frontier.chapters.indexOf(routeId) > frontier.frontierIndex;
};
