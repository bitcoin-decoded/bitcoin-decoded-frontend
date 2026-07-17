import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getCustodyOptions } from "../data";


export const CustodyOptions: FC = () => {
  const { t, language } = useTranslation();
  const { colors } = usePageTheme();
  const terms = getCustodyOptions(language, colors);

  return (
    <ExpandableDefinitions
      sectionTitle={t("custodyOptions.sectionTitle")}
      terms={terms}
    />
  );
};
