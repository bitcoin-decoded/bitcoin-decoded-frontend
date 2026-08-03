import { useCallback, useMemo } from "react";

import { useBadges } from "../../Achievements";
import { useTranslation } from "../../I18n";
import { getNavigationTree, type RouteName } from "../../Routing";
import { useUserData } from "../../UserData";
import { getModuleFrontier, isChapterOutOfSequence } from "../helpers";
import type { ChapterProgression, ResumePoint } from "../types";

export const useChapterProgression = (): ChapterProgression => {
  const { isEarned } = useBadges();
  const { status } = useUserData();
  const { t } = useTranslation();

  const tree = useMemo(() => getNavigationTree(t), [t]);
  const isSealed = useCallback((id: RouteName) => isEarned(id), [isEarned]);

  // Never out of sequence until the user's data is actually loaded: it keeps the
  // prerendered/first-paint markup free of locks and the resume notice, so they
  // appear only once we truly know where the reader stands.
  const isOutOfSequence = useCallback(
    (id: RouteName) => status === "ready" && isChapterOutOfSequence(tree, isSealed, id),
    [tree, isSealed, status],
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
