import { type CSSProperties, type FC, type ReactNode } from "react";

import { Caption, SurfaceCard, useBreakpoint } from "../../../Design";
import type { ExpandableTerm } from "../types";

import { TermCard } from "./TermCard";

import { BookOpenText } from "@icons";

type Props = {
  sectionTitle: string;
  terms: ExpandableTerm[];
  sectionIcon?: ReactNode;
};

export const ExpandableDefinitions: FC<Props> = ({ sectionTitle, terms, sectionIcon }) => {
  const isMobile = useBreakpoint() === "mobile";

  const stackStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.65rem" : "0.75rem",
  };

  const defaultIcon = <BookOpenText size={isMobile ? 16 : 18} strokeWidth={2} />;

  return (
    <SurfaceCard
      margin={isMobile ? "1.5rem 0" : "2.25rem 0"}
      gap={isMobile ? "1rem" : "1.15rem"}
    >
      <Caption tone="world" size="md" icon={sectionIcon ?? defaultIcon}>
        {sectionTitle}
      </Caption>

      <div style={stackStyle}>
        {terms.map((term) => (
          <TermCard key={term.key} term={term} />
        ))}
      </div>
    </SurfaceCard>
  );
};
