import type { NavigationItem, RouteName } from "../../../Routing";

export type ModuleChapter = {
  id: RouteName;
  label: string;
  /** 1-based position inside the module. */
  number: number;
  /** True for the end-of-module quiz (kind: "challenge"). */
  isChallenge: boolean;
};

export type ModuleChapters = {
  moduleLabel: string;
  chapters: ModuleChapter[];
  /** Index of the current route inside `chapters`. */
  currentIndex: number;
};

/**
 * Every chapter of the module the given route belongs to, in reading order,
 * plus where the route sits among them. Returns null for standalone pages that
 * have no module parent (home, get-started, badges).
 */
export const getModuleChapters = (
  tree: NavigationItem[],
  routeId: RouteName,
): ModuleChapters | null => {
  for (const module of tree) {
    if (!module.children) continue;

    const chapters = module.children
      .filter((child): child is NavigationItem & { id: RouteName } => Boolean(child.id))
      .map((child, index) => ({
        id: child.id,
        label: child.label,
        number: index + 1,
        isChallenge: child.kind === "challenge",
      }));

    const currentIndex = chapters.findIndex((chapter) => chapter.id === routeId);
    if (currentIndex === -1) continue;

    return { moduleLabel: module.label, chapters, currentIndex };
  }

  return null;
};
