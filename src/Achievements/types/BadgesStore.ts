import type { Badge } from "./Badge";
import type { EarnedBadges } from "./EarnedBadges";

export type BadgesStore = {
  earned: EarnedBadges;
  isEarned: (id: string) => boolean;
  earnedCount: number;
  totalCount: number;
  award: (id: string) => void;
  celebration: Badge | null;
  dismissCelebration: () => void;
};
