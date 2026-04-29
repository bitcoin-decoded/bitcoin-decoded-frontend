import type { NavigationItem, RouteName } from "../../../Routing";

// Helper function to find the path of labels leading to a specific page ID
export const findPathToId = (
  nodes: NavigationItem[],
  id: RouteName,
  currentPath: string[] = []
): string[] | null => {
  for (const node of nodes) {
    const newPath = [...currentPath, node.label];
    if (node.id === id) return newPath;
    if (node.children) {
      const foundPath = findPathToId(node.children, id, newPath);
      if (foundPath) return foundPath;
    }
  }
  return null;
};
