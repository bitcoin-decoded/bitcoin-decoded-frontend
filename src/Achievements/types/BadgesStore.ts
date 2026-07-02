import type { Badge } from "./Badge";
import type { EarnedBadges } from "./EarnedBadges";

export type BadgesStore = {
  earned: EarnedBadges;
  isEarned: (id: string) => boolean;
  earnedCount: number;
  totalCount: number;
  /** Idempotent: grants the badge once ever; first grant enqueues a celebration. */
  award: (id: string) => void;
  /** The badge currently being celebrated (head of the queue), or null. */
  celebration: Badge | null;
  dismissCelebration: () => void;
};
