import type { NavigationItem, RouteName } from "../../../Routing";

type ChapterPosition = {
  moduleLabel: string;
  number: number;
  isChallenge: boolean;
};

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
