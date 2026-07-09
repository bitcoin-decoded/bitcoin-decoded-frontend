import type { NavigationItem, RouteName } from "../../../Routing";

type ChapterPosition = {
  /** Parent module label (e.g. "La révolution Bitcoin"). */
  moduleLabel: string;
  /** 1-based index of the chapter within its module. */
  number: number;
  /** True for the end-of-module quiz (kind: "challenge"). */
  isChallenge: boolean;
};

/**
 * Locates a chapter route inside the 3-level navigation tree and returns its
 * module + 1-based position. Returns null for standalone pages with no module
 * parent (e.g. the Get-Started entry, the home page).
 */
export const getChapterPosition = (
  tree: NavigationItem[],
  routeId: RouteName,
): ChapterPosition | null => {
  for (const module of tree) {
    if (!module.children) continue;
    const index = module.children.findIndex((child) => child.id === routeId);
    if (index === -1) continue;
    return {
      moduleLabel: module.label,
      number: index + 1,
      isChallenge: module.children[index].kind === "challenge",
    };
  }
  return null;
};
