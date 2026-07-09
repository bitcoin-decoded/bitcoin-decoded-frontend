import type { TranslationKey } from "../../I18n";
import type { BadgeModule } from "../types";

export const getModuleLabelKey = (module: BadgeModule): TranslationKey => {
  if (module === "banking") return "nav.tree.bankingSystem";
  if (module === "moneyLaws") return "nav.tree.moneyLaws";
  return "nav.tree.bitcoinRevolution";
};
