import type { NavigationItem, RouteName } from "../../Routing";
import type { ModuleFrontier } from "../types";

/**
 * How far a reader has opened the way into the module containing `routeId`.
 *
 * Progression is forced *inside* a module and free *between* modules, so the
 * frontier is computed per module and knows nothing about the others.
 *
 * The frontier is the first chapter whose predecessors are not all sealed —
 * everything before it is open, everything after it is closed. Stated as one
 * boundary rather than "is my predecessor sealed?" on purpose: with a gapped
 * history (badges predating this feature, a replay) the per-chapter form can
 * yield a closed chapter followed by an open one, which is unreadable in the
 * rail. A single boundary is always monotonic.
 *
 * Returns null for pages with no module parent (home, get-started, badges) —
 * those are never gated.
 */
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

    // The first unsealed chapter is the frontier; chapter 01 is always open, so
    // an untouched module has its frontier at index 0.
    const unsealedIndex = chapters.findIndex((id) => !isSealed(id));
    const frontierIndex = unsealedIndex === -1 ? chapters.length - 1 : unsealedIndex;

    return { chapters, frontierIndex, frontierId: chapters[frontierIndex] };
  }

  return null;
};
