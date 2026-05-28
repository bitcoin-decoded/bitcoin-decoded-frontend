import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getAccountingTerms } from "../data";

export const AccountingTerms: FC = () => {
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const terms = getAccountingTerms(language, colors, moduleTheme);

  return (
    <ExpandableDefinitions
      sectionTitle={t("accountingTerms.sectionTitle")}
      terms={terms}
    />
  );
};
