import type { SubCategoryId, WalletSolution } from "../types";

/** Solutions to display for a sub-category: every solution tagged with it. */
export const selectSubCategorySolutions = (
  solutions: WalletSolution[],
  id: SubCategoryId,
): WalletSolution[] => solutions.filter((s) => s.subCategories.includes(id));
