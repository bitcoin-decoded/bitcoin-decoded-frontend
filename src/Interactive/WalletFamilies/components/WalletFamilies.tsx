import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getWalletFamilies } from "../data";


/** Thin wrapper (mirrors `AccountingTerms`): the three wallet families as
 *  expand-to-learn cards, each carrying a simplicité / souveraineté score
 *  matrix in its always-visible meta strip. */
export const WalletFamilies: FC = () => {
  const { t, language } = useTranslation();
  const { colors } = usePageTheme();
  const terms = getWalletFamilies(language, colors);

  return (
    <ExpandableDefinitions
      sectionTitle={t("walletFamilies.sectionTitle")}
      terms={terms}
    />
  );
};
