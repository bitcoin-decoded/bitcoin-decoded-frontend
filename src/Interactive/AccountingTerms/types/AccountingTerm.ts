import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { TermKey } from "./TermKey";

/** A single accounting definition shown as an expandable card. */
export type AccountingTerm = {
  key: TermKey;
  /** Uppercase mono label rendered on the card header (e.g. "ACTIF"). */
  title: string;
  /** One-line gloss shown next to the title even when collapsed. */
  summary: string;
  /** Rich content (italic prose, lists, KeywordHighlight…) shown when expanded. */
  body: ReactNode;
  /** Lucide icon rendered on the left of the header. */
  icon: LucideIcon;
  /** Accent token resolved against `usePageTheme().colors` to pick the card's hue. */
  accent: "asset" | "world" | "claim";
};
