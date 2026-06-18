import type { SubCategoryId } from "./SubCategoryId";

/** A resolved plan card: its sub-category, label, description and plan rank. */
export type SubCategoryItem = {
  id: SubCategoryId;
  label: string;
  comment: string;
  /** Plan rank letter - "A" is always the recommended pick (filled star). */
  plan: string;
};
