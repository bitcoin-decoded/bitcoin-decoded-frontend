import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getScientificMethodTerms } from "../data";

export const ScientificMethods: FC = () => {
  const { language } = useTranslation();
  const { colors } = usePageTheme();
  const terms = getScientificMethodTerms(language, colors);

  const fr = language === "fr";
  const sectionTitle = fr ? "Les deux écoles, côte à côte" : "The two schools, side by side";

  return <ExpandableDefinitions sectionTitle={sectionTitle} terms={terms} />;
};
