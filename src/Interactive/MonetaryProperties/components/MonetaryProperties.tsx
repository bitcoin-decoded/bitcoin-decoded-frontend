import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getMonetaryProperties } from "../data";

import { Scale } from "@icons";

export const MonetaryProperties: FC = () => {
  const { t, language } = useTranslation();
  const { colors } = usePageTheme();
  const terms = getMonetaryProperties(language, colors);

  return (
    <ExpandableDefinitions
      sectionTitle={t("monetaryProperties.sectionTitle")}
      sectionIcon={<Scale size={18} strokeWidth={2} />}
      terms={terms}
    />
  );
};
