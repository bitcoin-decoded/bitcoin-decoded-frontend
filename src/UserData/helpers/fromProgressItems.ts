import type { ProgressItem, ReadingProgressMap, UserData } from "../types";

import { parseChapterProgress } from "./parseChapterProgress";

// The inverse of toProgressItems: rebuild the app's snapshot from the backend's
// rows. Unknown item types are ignored, and a malformed chapter payload is
// dropped rather than sinking the whole load.
export const fromProgressItems = (items: ProgressItem[]): UserData => {
  const badges: Record<string, number> = {};
  const readingProgress: ReadingProgressMap = {};

  for (const item of items) {
    if (item.itemType === "badge") {
      const at = (item.data as { at?: unknown } | null)?.at;
      badges[item.itemId] = typeof at === "number" ? at : Date.now();
    } else if (item.itemType === "chapter") {
      const progress = parseChapterProgress(item.data);
      if (progress) readingProgress[item.itemId] = progress;
    }
  }

  return { badges, readingProgress };
};
