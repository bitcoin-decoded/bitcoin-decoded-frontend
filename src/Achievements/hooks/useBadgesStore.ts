import { useCallback, useEffect, useState } from "react";

import { BADGE_BY_ID, BADGES, BADGES_STORAGE_KEY } from "../data";
import { readEarnedBadges } from "../helpers";
import type { BadgesStore, EarnedBadges } from "../types";

type State = {
  earned: EarnedBadges;
  queue: string[];
};

export const useBadgesStore = (): BadgesStore => {
  const [{ earned, queue }, setState] = useState<State>(() => ({
    earned: readEarnedBadges(),
    queue: [],
  }));

  useEffect(() => {
    try {
      localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(earned));
    } catch {
      // storage full or unavailable - silently ignore
    }
  }, [earned]);

  const award = useCallback((id: string) => {
    if (!BADGE_BY_ID.has(id)) return;
    setState((prev) => {
      if (prev.earned[id]) return prev;
      return {
        earned: { ...prev.earned, [id]: Date.now() },
        queue: [...prev.queue, id],
      };
    });
  }, []);

  const dismissCelebration = useCallback(
    () => setState((prev) => ({ ...prev, queue: prev.queue.slice(1) })),
    [],
  );

  const isEarned = useCallback((id: string) => Boolean(earned[id]), [earned]);

  return {
    earned,
    isEarned,
    earnedCount: Object.keys(earned).length,
    totalCount: BADGES.length,
    award,
    celebration: queue.length > 0 ? (BADGE_BY_ID.get(queue[0]) ?? null) : null,
    dismissCelebration,
  };
};
