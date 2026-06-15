import { ROUTE_NAME } from "../../../Routing";

// Chapters rendered in block-by-block mode. The block reader shows its own
// always-visible jalon pill, so the scroll-percentage ReadingProgressBar is
// suppressed for these (it would regress each time a block is revealed).
// Extend as chapters are migrated; once all are block-mode, drop the bar.
export const BLOCK_READING_CHAPTERS = new Set<string>([
  ROUTE_NAME.Banking_1,
  ROUTE_NAME.Banking_2,
  ROUTE_NAME.Banking_3,
  ROUTE_NAME.Banking_4,
  ROUTE_NAME.Banking_5,
  ROUTE_NAME.Banking_6,
  ROUTE_NAME.MoneyLaws_1,
  ROUTE_NAME.MoneyLaws_2,
  ROUTE_NAME.MoneyLaws_3,
]);
