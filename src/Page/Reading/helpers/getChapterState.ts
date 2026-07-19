import type { ChapterState } from "../types";

type ChapterFacts = {
  /** The chapter's badge is earned — it has been completed at least once, ever. */
  badgeEarned: boolean;
  /**
   * The block the reader actually moved to, or null when they never started.
   * Opening a chapter does not count: block 0 is simply what a chapter shows.
   */
  lastVisitedBlock: number | null;
};

/**
 * The three states, derived in one place.
 *
 * The badge decides completion — not the reading pass's own `finished` flag,
 * which "Recommencer" clears while the badge stays earned. A chapter that has
 * been completed once always reopens with its context, however far a later
 * re-read has got.
 *
 * "Started" is a fact the reader creates by moving between blocks, never by
 * merely opening the chapter. That distinction is the whole point: without it,
 * "never opened" and "came back to block 01" are the same stored state.
 */
export const getChapterState = ({ badgeEarned, lastVisitedBlock }: ChapterFacts): ChapterState => {
  if (badgeEarned) return "completed";
  return lastVisitedBlock === null ? "unvisited" : "inProgress";
};
