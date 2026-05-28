import { type CSSProperties, type FC } from "react";

import { BookOpenText } from "lucide-react";

import { Caption, SurfaceCard, useBreakpoint } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getAccountingTerms } from "../data";

import { TermCard } from "./TermCard";

export const AccountingTerms: FC = () => {
  const { t, language } = useTranslation();
  const isMobile = useBreakpoint() === "mobile";
  const terms = getAccountingTerms(language);

  const stackStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.65rem" : "0.75rem",
  };

  const captionIcon = <BookOpenText size={isMobile ? 16 : 18} strokeWidth={2} />;

  return (
    <SurfaceCard
      margin={isMobile ? "1.5rem 0" : "2.25rem 0"}
      gap={isMobile ? "1rem" : "1.15rem"}
    >
      <Caption tone="world" size="md" icon={captionIcon}>
        {t("accountingTerms.sectionTitle")}
      </Caption>

      <div style={stackStyle}>
        {terms.map((term) => (
          <TermCard key={term.key} term={term} />
        ))}
      </div>
    </SurfaceCard>
  );
};
