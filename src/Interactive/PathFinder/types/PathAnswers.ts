import type { PathTier } from "./PathTier";

/**
 * The reader's four answers. `null` = not answered yet. Capital is stored
 * directly as the internal tier (the long option label is shown, the P1/P2/P3
 * value stays hidden).
 */
export type PathAnswers = {
  /** Q1 - capital tier. */
  capital: PathTier | null;
  /** Q2 - single buy vs recurring (DCA). Collected for the future DCA tool. */
  frequency: "single" | "dca" | null;
  /** Q3 - self-custody intent. Drives the visual hierarchy. */
  custody: "simple" | "sovereign" | "unsure" | null;
  /** Q4 - privacy. Gates the P2P path. */
  privacy: "discreet" | "dontcare" | null;
};
