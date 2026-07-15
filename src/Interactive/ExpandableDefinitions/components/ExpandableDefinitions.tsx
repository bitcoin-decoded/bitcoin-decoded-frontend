import { type CSSProperties, type FC } from "react";

import { Caption, SurfaceCard, useBreakpoint } from "../../../Design";
import type { ExpandableTerm, TermIcon } from "../types";

import { TermCard } from "./TermCard";

import { DoodleBook } from "@doodle";

type Props = {
  sectionTitle: string;
  terms: ExpandableTerm[];
  /** A component (not an element) so this owns the size — default and
   *  prop-supplied markers render identically, responsively. */
  sectionIcon?: TermIcon;
};

export const ExpandableDefinitions: FC<Props> = ({ sectionTitle, terms, sectionIcon }) => {
  const isMobile = useBreakpoint() === "mobile";

  const stackStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "0.65rem" : "0.75rem",
  };

  const Icon = sectionIcon ?? DoodleBook;
  const iconSize = isMobile ? 24 : 30;

  return (
    <SurfaceCard margin={isMobile ? "1.5rem 0" : "2.25rem 0"} gap={isMobile ? "1rem" : "1.15rem"}>
      <Caption tone="world" size="md" icon={<Icon size={iconSize} strokeWidth={2} />}>
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
