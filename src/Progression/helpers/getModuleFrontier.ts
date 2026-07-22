import type { NavigationItem, RouteName } from "../../Routing";
import type { ModuleFrontier } from "../types";

export const getModuleFrontier = (
  tree: NavigationItem[],
  isSealed: (id: RouteName) => boolean,
  routeId: RouteName,
): ModuleFrontier | null => {
  for (const module of tree) {
    if (!module.children) continue;

    const chapters = module.children
      .filter((child): child is NavigationItem & { id: RouteName } => Boolean(child.id))
      .map((child) => child.id);

    if (!chapters.includes(routeId)) continue;

    const unsealedIndex = chapters.findIndex((id) => !isSealed(id));
    const frontierIndex = unsealedIndex === -1 ? chapters.length - 1 : unsealedIndex;

    return { chapters, frontierIndex, frontierId: chapters[frontierIndex] };
  }

  return null;
};
