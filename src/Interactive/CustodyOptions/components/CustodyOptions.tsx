import { type FC } from "react";

import { DoorOpen } from "lucide-react";

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
      sectionIcon={<DoorOpen size={18} strokeWidth={2} />}
      terms={terms}
    />
  );
};
