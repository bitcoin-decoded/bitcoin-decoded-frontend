import type { SubCategoryId } from "./SubCategoryId";

export type ProfilePlan = {
  subCategory: SubCategoryId;
  text: string;
  label?: string;
};
