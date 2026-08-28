import type { TranslationKey } from "../../../I18n";

// One "aha" step of the staircase: a quotidian question, one final illustration
// that makes the mechanism intuitive, and a one-line switch whose emphasis word
// is the aha.
export type InsightStep = {
  id: string;
  index: number;
  image: string;
  eyebrowKey: TranslationKey;
  headingKey: TranslationKey;
  altKey: TranslationKey;
  captionKey: TranslationKey;
  basculeLeadKey: TranslationKey;
  basculeEmphasisKey: TranslationKey;
  basculeTailKey: TranslationKey;
};
