import type { SubCategoryItem } from "./SubCategoryItem";
import type { WalletSection } from "./WalletSection";

/** One of the two output sections, fully resolved from the answers. */
export type SectionPlan = {
  section: WalletSection;
  /** Step number shown to the reader (1 = acquisition, 2 = detention). */
  step: number;
  label: string;
  subCategories: SubCategoryItem[];
};
