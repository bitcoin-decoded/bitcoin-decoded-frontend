import { useMemo } from "react";

import { useUserData } from "../../UserData";
import { BADGE_BY_ID, BADGES } from "../data";
import type { BadgesStore } from "../types";

// Adapts the raw user-data snapshot into the badge API the app already speaks.
// It owns the catalog concerns (validating stored ids, mapping a queued id to
// its Badge) so UserData stays catalog-agnostic and swappable.
export const useBadges = (): BadgesStore => {
  const { badges, awardBadge, celebrationQueue, dismissCelebration } = useUserData();

  return useMemo<BadgesStore>(() => {
    const earned = Object.fromEntries(Object.entries(badges).filter(([id]) => BADGE_BY_ID.has(id)));
    return {
      earned,
      isEarned: (id) => Boolean(earned[id]),
      earnedCount: Object.keys(earned).length,
      totalCount: BADGES.length,
      award: (id) => {
        if (BADGE_BY_ID.has(id)) awardBadge(id);
      },
      celebration:
        celebrationQueue.length > 0 ? (BADGE_BY_ID.get(celebrationQueue[0]) ?? null) : null,
      dismissCelebration,
    };
  }, [badges, awardBadge, celebrationQueue, dismissCelebration]);
};
