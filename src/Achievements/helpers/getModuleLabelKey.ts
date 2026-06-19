import type { TranslationKey } from "../../I18n";
import type { BadgeModule } from "../types";

/** The nav-tree heading key for a module - reused as the grid section title. */
export const getModuleLabelKey = (module: BadgeModule): TranslationKey => {
  if (module === "banking") return "nav.tree.bankingSystem";
  if (module === "moneyLaws") return "nav.tree.moneyLaws";
  return "nav.tree.bitcoinRevolution";
};
