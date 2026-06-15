import { ROUTE_NAME } from "../../../Routing";

// Chapters rendered in block-by-block mode. The block reader shows its own
// always-visible jalon pill, so the scroll-percentage ReadingProgressBar is
// suppressed for these (it would regress each time a block is revealed).
// Extend as chapters are migrated; once all are block-mode, drop the bar.
export const BLOCK_READING_CHAPTERS = new Set<string>([ROUTE_NAME.Banking_1]);
