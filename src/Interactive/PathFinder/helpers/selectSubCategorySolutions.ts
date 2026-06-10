import type { SubCategoryId, WalletSolution } from "../types";

/**
 * Solutions to display for a sub-category. The "exchange" rail applies the hard
 * filter (§4.1): never show a platform you can't withdraw from — you'd be stuck.
 * Custodial holding keeps the non-withdrawable ones on purpose (that's the point).
 */
export const selectSubCategorySolutions = (
  solutions: WalletSolution[],
  id: SubCategoryId,
): WalletSolution[] => {
  if (id === "exchange") {
    return solutions.filter((s) => s.subCategories.includes("exchange") && s.externalWithdrawal);
  }
  return solutions.filter((s) => s.subCategories.includes(id));
};
