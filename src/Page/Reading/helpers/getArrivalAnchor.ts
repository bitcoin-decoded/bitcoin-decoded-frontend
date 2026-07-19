import type { ArrivalAnchor, ChapterState } from "../types";

/**
 * Arrival rule: one output, derived from the chapter's state and nothing else.
 * Not from what the router scrolled, not from what the browser restored.
 *
 * - unvisited  → the top, so the number, title, reading time and introduction
 *                are what greets the reader.
 * - inProgress → back on the block they actually stopped at, block 01 included.
 * - completed  → the top again: a finished chapter is reopened to be re-read
 *                whole, with its context.
 *
 * Only *arrival* is governed here. Jumping to a block from the ribbon is a
 * deliberate move and always lands on that block.
 */
export const getArrivalAnchor = (
  state: ChapterState,
  lastVisitedBlock: number | null,
): ArrivalAnchor =>
  state === "inProgress" && lastVisitedBlock !== null
    ? { type: "block", index: lastVisitedBlock }
    : { type: "top" };
