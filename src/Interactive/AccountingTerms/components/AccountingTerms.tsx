import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getAccountingTerms } from "../data";

type Props = {
  /** Fired once all three terms have been explored (the component's final state). */
  onComplete?: () => void;
};

export const AccountingTerms: FC<Props> = ({ onComplete }) => {
  const { t, language } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const terms = getAccountingTerms(language, colors, moduleTheme);

  return (
    <ExpandableDefinitions
      sectionTitle={t("accountingTerms.sectionTitle")}
      terms={terms}
      onAllExplored={onComplete}
    />
  );
};
