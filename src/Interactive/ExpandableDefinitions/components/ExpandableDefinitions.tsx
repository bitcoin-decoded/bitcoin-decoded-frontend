import { type CSSProperties, type FC, type ReactNode, useEffect, useState } from "react";

import { BookOpenText } from "lucide-react";

import { Caption, SurfaceCard, useBreakpoint } from "../../../Design";
import type { ExpandableTerm } from "../types";

import { TermCard } from "./TermCard";

type Props = {
  /** Section heading rendered above the term stack. */
  sectionTitle: string;
  /** Pre-resolved terms (caller is responsible for mapping accents against the theme). */
  terms: ExpandableTerm[];
  /** Optional icon for the section header. Defaults to `BookOpenText`. */
  sectionIcon?: ReactNode;
  /**
   * Fired once every term has been expanded at least once — the component's
   * "fully explored" final state. Used by the block reader to gate progress.
   */
  onAllExplored?: () => void;
};

/**
 * Pedagogical card stack — N click-to-reveal definition cards inside a single
 * surface, each with its own accent. Used by Banking_1's accounting glossary
 * and Banking_2's M0/M2 explainer; designed to be reused for any future
 * "expand this term to learn more" pattern.
 */
export const ExpandableDefinitions: FC<Props> = ({
  sectionTitle,
  terms,
  sectionIcon,
  onAllExplored,
}) => {
  const isMobile = useBreakpoint() === "mobile";
  const [explored, setExplored] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (onAllExplored && terms.length > 0 && explored.size >= terms.length) onAllExplored();
  }, [explored, terms.length, onAllExplored]);

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
          <TermCard
            key={term.key}
            term={term}
            onOpen={() =>
              setExplored((prev) => (prev.has(term.key) ? prev : new Set(prev).add(term.key)))
            }
          />
        ))}
      </div>
    </SurfaceCard>
  );
};
