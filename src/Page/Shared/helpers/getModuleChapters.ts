import type { NavigationItem, RouteName } from "../../../Routing";

export type ModuleChapter = {
  id: RouteName;
  label: string;
  number: number;
  isChallenge: boolean;
};

export type ModuleChapters = {
  moduleLabel: string;
  chapters: ModuleChapter[];
  currentIndex: number;
};

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
