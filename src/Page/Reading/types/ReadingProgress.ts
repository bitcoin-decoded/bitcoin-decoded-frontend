// Per-chapter reading progress, persisted to localStorage so a reader
// resumes exactly where they left off.
export type ReadingProgress = {
  // Furthest block ever revealed (blocks past this are not rendered yet).
  maxRevealed: number;
  // Block the reader is currently focused on.
  current: number;
  // Indices of tool blocks already manipulated (stay unlocked on the way back).
  done: number[];
  // Chapter completed via the final "Terminer" button.
  finished: boolean;
};
