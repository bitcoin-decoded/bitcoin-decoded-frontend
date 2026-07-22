import type { NavigationItem, RouteName } from "../../Routing";

import { getModuleFrontier } from "./getModuleFrontier";

export const isChapterOutOfSequence = (
  tree: NavigationItem[],
  isSealed: (id: RouteName) => boolean,
  routeId: RouteName,
): boolean => {
  const frontier = getModuleFrontier(tree, isSealed, routeId);
  if (!frontier) return false;

  return frontier.chapters.indexOf(routeId) > frontier.frontierIndex;
};
