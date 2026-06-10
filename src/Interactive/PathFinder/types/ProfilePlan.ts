import type { SubCategoryId } from "./SubCategoryId";

/**
 * One recommended option for a step. `subCategory` drives the icon, the
 * criteria pictograms and the solution list; `text` is the study's description.
 * `label` overrides the generic family name when the study names a specific
 * configuration (e.g. "Multisig réparti", "Service DCA dédié").
 */
export type ProfilePlan = {
  subCategory: SubCategoryId;
  text: string;
  label?: string;
};
