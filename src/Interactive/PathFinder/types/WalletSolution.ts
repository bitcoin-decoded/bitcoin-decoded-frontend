import type { Language } from "../../../I18n";

import type { SubCategoryId } from "./SubCategoryId";

export type WalletSolution = {
  name: string;
  custodial: boolean;
  openSource: boolean;
  connexion: "hot" | "cold" | "n-a";
  free: boolean;
  multisig: boolean;
  subCategories: SubCategoryId[];
  sensitiveNote?: Record<Language, string>;
};
