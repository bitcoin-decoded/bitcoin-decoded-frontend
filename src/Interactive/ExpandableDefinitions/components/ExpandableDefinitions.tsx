import { type CSSProperties, type FC } from "react";

import { Caption, SurfaceCard, useBreakpoint } from "../../../Design";
import { FrText } from "../../../I18n";
import type { ExpandableTerm } from "../types";

import { TermCard } from "./TermCard";

type Props = {
  sectionTitle: string;
  terms: ExpandableTerm[];
};

export const ExpandableDefinitions: FC<Props> = ({ sectionTitle, terms }) => {
  const isMobile = useBreakpoint() === "mobile";

  const stackStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.65rem" : "0.75rem",
  };

  return (
    <FrText>
      <SurfaceCard margin={isMobile ? "1.5rem 0" : "2.25rem 0"} gap={isMobile ? "1rem" : "1.15rem"}>
        <Caption tone="world" size="md">
          {sectionTitle}
        </Caption>

        <div style={stackStyle}>
          {terms.map((term) => (
            <TermCard key={term.key} term={term} />
          ))}
        </div>
      </SurfaceCard>
    </FrText>
  );
};
