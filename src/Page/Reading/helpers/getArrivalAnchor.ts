/** Where a reader should land when a block-reading chapter opens. */
export type ArrivalAnchor = "chapterTop" | "activeBlock";

type ChapterProgress = {
  /** The chapter has been completed (its badge is earned). */
  finished: boolean;
  /** Index of the block the reader stopped on. */
  current: number;
};

/**
 * Arrival rule, stated once and derived purely from progress — never from what
 * the browser happens to restore.
 *
 * A chapter opens at its top: the reader sees the number, the title and the
 * reading time before anything else. That holds for a first visit and for a
 * chapter already finished, where the header is the natural way back in.
 *
 * The single exception is a chapter left part-read: there the reader is put
 * back on the block they stopped at, since the top would cost them the scroll
 * they had already done. Block 0 is not that case — a chapter opened at its
 * first block is indistinguishable from a first visit, so it gets the header.
 *
 * Note this only governs *arrival*. Jumping to a block from the ribbon (block 1
 * included) is a deliberate move and always lands on that block.
 */
export const getArrivalAnchor = ({ finished, current }: ChapterProgress): ArrivalAnchor =>
  !finished && current > 0 ? "activeBlock" : "chapterTop";
