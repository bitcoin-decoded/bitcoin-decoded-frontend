import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Shared primitive for "click-to-reveal" definition cards. Used by
 * `AccountingTerms` (Banking_1) and `MonetaryAggregates` (Banking_2).
 *
 * The caller is responsible for resolving the accent colors against the
 * current theme — that keeps `TermCard` purely visual and theme-agnostic.
 */
export type ExpandableTerm = {
  /** Stable React key. */
  key: string;
  /** Uppercase mono header label (e.g. "ACTIF", "M2"). */
  title: string;
  /** One-line gloss shown next to the title even when collapsed. */
  summary: string;
  /** Rich JSX revealed when the card is expanded. */
  body: ReactNode;
  /** Lucide icon component rendered in the card's left circle. */
  icon: LucideIcon;
  /** Resolved hex/rgba color used for the title, icon and active border. */
  accentText: string;
  /** Resolved hex/rgba color used for the static border + opacity-derived washes. */
  accentBorder: string;
};
