import { useCallback, useMemo } from "react";

import { useBadges } from "../../Achievements";
import { useTranslation } from "../../I18n";
import { getNavigationTree, type RouteName } from "../../Routing";
import { getModuleFrontier, isChapterLocked } from "../helpers";
import type { ChapterLock, LockReason } from "../types";

/**
 * The single reading of sequential progression.
 *
 * Completion is the chapter's badge — the same authority the reading engine
 * uses to decide where an arriving reader lands, so a chapter cannot be
 * "finished enough to anchor" and "not finished enough to unlock" at once.
 *
 * Returns query functions rather than a verdict for one chapter: the navbar and
 * the rail need the state of every chapter in a module, and a hook cannot be
 * called inside a map.
 */
export const useChapterLock = (): ChapterLock => {
  const { isEarned } = useBadges();
  const { t } = useTranslation();

  const tree = useMemo(() => getNavigationTree(t), [t]);
  const isSealed = useCallback((id: RouteName) => isEarned(id), [isEarned]);

  const isLocked = useCallback(
    (id: RouteName) => isChapterLocked(tree, isSealed, id),
    [tree, isSealed],
  );

  const nextAvailableChapter = useCallback(
    (id: RouteName) => getModuleFrontier(tree, isSealed, id)?.frontierId ?? null,
    [tree, isSealed],
  );

  const lockReason = useCallback(
    (id: RouteName): LockReason | null => {
      const frontier = getModuleFrontier(tree, isSealed, id);
      if (!frontier) return null;

      const index = frontier.chapters.indexOf(id);
      if (index <= frontier.frontierIndex) return null;

      // What stands in the way is the frontier itself: seal it and the way
      // moves one chapter further.
      return { blockedBy: frontier.frontierId };
    },
    [tree, isSealed],
  );

  return { isLocked, nextAvailableChapter, lockReason };
};
