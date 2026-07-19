import type { NavigationItem, RouteName } from "../../Routing";

import { getModuleFrontier } from "./getModuleFrontier";

/**
 * The chapter sits past its module's frontier, so the reader has reached it
 * without going through what comes before.
 *
 * This states a *fact about position*, not a permission. Reading is never
 * refused: what the fact drives is the navigation affordances and whether the
 * chapter may be sealed. Naming it after either consequence would make the name
 * lie to the other consumer.
 */
export const isChapterOutOfSequence = (
  tree: NavigationItem[],
  isSealed: (id: RouteName) => boolean,
  routeId: RouteName,
): boolean => {
  const frontier = getModuleFrontier(tree, isSealed, routeId);
  if (!frontier) return false;

  return frontier.chapters.indexOf(routeId) > frontier.frontierIndex;
};
