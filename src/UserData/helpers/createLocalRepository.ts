import { isBrowser, readStored, writeStored } from "../../Platform";
import { LEGACY_BADGES_KEY, LEGACY_READING_PREFIX, USER_DATA_STORAGE_KEY } from "../data";
import type { ReadingProgressMap, UserData, UserRepository } from "../types";

import { parseChapterProgress } from "./parseChapterProgress";

const parseBadges = (raw: unknown): Record<string, number> => {
  if (raw === null || typeof raw !== "object") return {};
  const out: Record<string, number> = {};
  for (const [id, at] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof at === "number") out[id] = at;
  }
  return out;
};

const readConsolidated = (): UserData | null => {
  const raw = readStored(USER_DATA_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const readingProgress: ReadingProgressMap = {};
    if (parsed.readingProgress && typeof parsed.readingProgress === "object") {
      for (const [chapterId, value] of Object.entries(
        parsed.readingProgress as Record<string, unknown>,
      )) {
        const progress = parseChapterProgress(value);
        if (progress) readingProgress[chapterId] = progress;
      }
    }
    return { badges: parseBadges(parsed.badges), readingProgress };
  } catch {
    return null;
  }
};

// One-time migration for readers who still have the pre-consolidation keys: the
// single badges key plus one reading key per chapter. Their next save collapses
// everything into the consolidated key.
const readLegacy = (): UserData => {
  const badgesRaw = readStored(LEGACY_BADGES_KEY);
  let badges: Record<string, number> = {};
  if (badgesRaw) {
    try {
      badges = parseBadges(JSON.parse(badgesRaw));
    } catch {
      badges = {};
    }
  }

  const readingProgress: ReadingProgressMap = {};
  if (isBrowser) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(LEGACY_READING_PREFIX)) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const progress = parseChapterProgress(JSON.parse(raw));
        if (progress) readingProgress[key.slice(LEGACY_READING_PREFIX.length)] = progress;
      }
    } catch {
      // A single malformed entry must not sink the whole load.
    }
  }

  return { badges, readingProgress };
};

// The localStorage implementation of the user repository. `load` is async by
// contract but resolves immediately: no simulated latency, the seam is what
// matters. Swapping this for a backend implementation is the entire migration.
export const createLocalRepository = (): UserRepository => ({
  load: async () => readConsolidated() ?? readLegacy(),
  save: (data) => writeStored(USER_DATA_STORAGE_KEY, JSON.stringify(data)),
});
