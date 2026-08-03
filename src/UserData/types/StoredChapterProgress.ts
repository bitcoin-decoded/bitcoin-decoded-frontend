// The persisted reading state for a single chapter. Mirrors what the block
// reader keeps at runtime, plus the block count it was saved against, so a stale
// snapshot (chapter re-split since) can be detected and dropped on load.
export type StoredChapterProgress = {
  maxRevealed: number;
  current: number;
  done: number[];
  finished: boolean;
  lastVisitedBlock: number | null;
  blockCount: number;
};
