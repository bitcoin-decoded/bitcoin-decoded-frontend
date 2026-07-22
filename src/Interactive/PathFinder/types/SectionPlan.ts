import type { SubCategoryItem } from "./SubCategoryItem";
import type { WalletSection } from "./WalletSection";

export type SectionPlan = {
  section: WalletSection;
  step: number;
  label: string;
  subCategories: SubCategoryItem[];
};
