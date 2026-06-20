import { type FC } from "react";

import { usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { ExpandableDefinitions } from "../../ExpandableDefinitions";
import { getScientificMethodTerms } from "../data";

/**
 * Two click-to-reveal cards (keynesian / austrian) wrapping the matched
 * method illustrations. Mirrors the AccountingTerms pattern: the reader
 * compares one school at a time rather than facing both visuals stacked
 * vertically. The opposition of forms is preserved inside each body.
 */
export const ScientificMethods: FC = () => {
  const { language } = useTranslation();
  const { colors } = usePageTheme();
  const terms = getScientificMethodTerms(language, colors);

  const fr = language === "fr";
  const sectionTitle = fr ? "Les deux écoles, côte à côte" : "The two schools, side by side";

  return <ExpandableDefinitions sectionTitle={sectionTitle} terms={terms} />;
};
