import type { NavigationItem } from "../../../Routing";

export const findAllDescendantLabels = (item: NavigationItem): string[] => {
  let labels: string[] = [];
  if (item.children) {
    for (const child of item.children) {
      labels.push(child.label);
      labels = labels.concat(findAllDescendantLabels(child));
    }
  }
  return labels;
};