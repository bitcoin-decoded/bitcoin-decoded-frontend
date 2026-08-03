import type { StoredChapterProgress } from "./StoredChapterProgress";
import type { UserDataStatus } from "./UserDataStatus";

// What the provider hands down. Feature hooks (`useBadges`, the block reader)
// adapt this into their own shapes, so no business component ever reads it raw
// or knows where the data came from.
export type UserDataValue = {
  status: UserDataStatus;
  error: Error | null;
  retry: () => void;

  badges: Record<string, number>;
  awardBadge: (id: string) => void;
  celebrationQueue: string[];
  dismissCelebration: () => void;

  getChapterReading: (chapterId: string) => StoredChapterProgress | undefined;
  saveChapterReading: (chapterId: string, progress: StoredChapterProgress) => void;
};
