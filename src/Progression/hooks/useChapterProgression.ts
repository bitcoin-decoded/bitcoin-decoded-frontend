import { useCallback, useMemo } from "react";

import { useBadges } from "../../Achievements";
import { useTranslation } from "../../I18n";
import { getNavigationTree, type RouteName } from "../../Routing";
import { getModuleFrontier, isChapterOutOfSequence } from "../helpers";
import type { ChapterProgression, ResumePoint } from "../types";

/**
 * The single reading of sequential progression.
 *
 * Completion is the chapter's badge, the same authority the reading engine uses
 * to decide where an arriving reader lands, so a chapter cannot be "finished
 * enough to anchor" and "not finished enough to unlock" at once.
 *
 * Returns query functions rather than a verdict for one chapter: the navbar and
 * the rail need the state of every chapter in a module, and a hook cannot be
 * called inside a map.
 */
export const useChapterProgression = (): ChapterProgression => {
  const { isEarned } = useBadges();
  const { t } = useTranslation();

  const tree = useMemo(() => getNavigationTree(t), [t]);
  const isSealed = useCallback((id: RouteName) => isEarned(id), [isEarned]);

  const isOutOfSequence = useCallback(
    (id: RouteName) => isChapterOutOfSequence(tree, isSealed, id),
    [tree, isSealed],
  );

  const resumePoint = useCallback(
    (id: RouteName): ResumePoint | null => {
      const frontier = getModuleFrontier(tree, isSealed, id);
      if (!frontier) return null;

      return {
        route: frontier.frontierId,
        chapterNumber: frontier.frontierIndex + 1,
        // The frontier sitting on the first chapter means nothing in this
        // module has been sealed, so there is no progress to resume.
        hasProgress: frontier.frontierIndex > 0,
      };
    },
    [tree, isSealed],
  );

  return { isOutOfSequence, resumePoint };
};
