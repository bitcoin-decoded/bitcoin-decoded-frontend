import type { SubCategoryId } from "./SubCategoryId";
import type { WalletSolution } from "./WalletSolution";

/** A resolved plan card: its sub-category, label, description, plan rank, and
 *  (filtered) solutions. */
export type SubCategoryItem = {
  id: SubCategoryId;
  label: string;
  comment: string;
  /** Plan rank letter — "A" is always the recommended pick (filled star). */
  plan: string;
  solutions: WalletSolution[];
};
