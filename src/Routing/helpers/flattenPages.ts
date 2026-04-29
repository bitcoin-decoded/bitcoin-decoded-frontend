import type { NavigationItem } from "../types";

// Helper function to recursively flatten the navigation tree into a simple list of pages
export const flattenPages = (items: NavigationItem[]): NavigationItem[] => {
  let pages: NavigationItem[] = [];
  for (const item of items) {
    if (item.isPage) {
      pages.push(item);
    }
    if (item.children && item.children.length > 0) {
      pages = pages.concat(flattenPages(item.children));
    }
  }
  return pages;
};
