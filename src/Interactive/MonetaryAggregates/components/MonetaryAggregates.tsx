import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getMonetaryAggregates } from "../data";


export const MonetaryAggregates: FC = () => {
  const { t, language } = useTranslation();
  const { colors } = usePageTheme();
  const terms = getMonetaryAggregates(language, colors);

  return (
    <ExpandableDefinitions
      sectionTitle={t("monetaryAggregates.sectionTitle")}
      terms={terms}
    />
  );
};
