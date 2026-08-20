import type { TranslationKey } from "../../../I18n";

// The four reveal blocks of the About modal, each a list of paragraph keys. The
// last block holds two paragraphs but reveals as one unit.
export const ABOUT_BLOCKS: TranslationKey[][] = [
  ["about.p1"],
  ["about.p2"],
  ["about.p3"],
  ["about.p4a", "about.p4b"],
];
