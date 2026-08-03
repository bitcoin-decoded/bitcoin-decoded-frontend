import type { StoredChapterProgress } from "../types";

// Validates the persisted shape of one chapter's reading state. Keeps the stored
// blockCount as-is: whether it still matches the chapter is the block reader's
// call, not the storage layer's.
export const parseChapterProgress = (raw: unknown): StoredChapterProgress | null => {
  if (raw === null || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  if (
    typeof p.maxRevealed !== "number" ||
    typeof p.current !== "number" ||
    typeof p.finished !== "boolean" ||
    typeof p.blockCount !== "number" ||
    !Array.isArray(p.done)
  ) {
    return null;
  }
  return {
    maxRevealed: p.maxRevealed,
    current: p.current,
    done: p.done.filter((d): d is number => typeof d === "number"),
    finished: p.finished,
    lastVisitedBlock: typeof p.lastVisitedBlock === "number" ? p.lastVisitedBlock : null,
    blockCount: p.blockCount,
  };
};
