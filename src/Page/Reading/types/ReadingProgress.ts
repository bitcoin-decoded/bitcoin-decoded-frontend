// Per-chapter reading progress, persisted to localStorage so a reader
// resumes exactly where they left off.
export type ReadingProgress = {
  // Furthest block ever revealed (blocks past this are not rendered yet).
  maxRevealed: number;
  // Block the reader is currently focused on.
  current: number;
  // Indices of tool blocks already manipulated (stay unlocked on the way back).
  done: number[];
  // This reading pass was sealed via the final "Terminer" button. NOT the same
  // as "the chapter is completed": "Recommencer" clears this while the badge
  // stays earned. The badge is the authority on completion — see
  // `getChapterState`.
  finished: boolean;
  // The block the reader actually moved to, or null when they never started.
  // Opening a chapter does not count: block 0 is simply what a chapter shows.
  lastVisitedBlock: number | null;
};
