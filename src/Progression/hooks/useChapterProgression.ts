import { useCallback, useMemo } from "react";

import { useBadges } from "../../Achievements";
import { useTranslation } from "../../I18n";
import { getNavigationTree, type RouteName } from "../../Routing";
import { getModuleFrontier, isChapterOutOfSequence } from "../helpers";
import type { ChapterProgression, ResumePoint } from "../types";

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
        hasProgress: frontier.frontierIndex > 0,
      };
    },
    [tree, isSealed],
  );

  return { isOutOfSequence, resumePoint };
};
