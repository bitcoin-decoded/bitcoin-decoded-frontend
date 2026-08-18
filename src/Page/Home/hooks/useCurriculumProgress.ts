import { useMemo } from "react";

import { useBadges } from "../../../Achievements";
import { type TranslationKey, useTranslation } from "../../../I18n";
import { getNavigationTree, type RouteName } from "../../../Routing";
import { useUserData } from "../../../UserData";
import { CURRICULUM_MODULES, getModuleNotions } from "../data";
import { getModuleReadingMinutes } from "../helpers";
import type { CurriculumCard, CurriculumProgress, CurriculumResume, ModuleState } from "../types";

const moduleState = (done: number, total: number): ModuleState =>
  done === 0 ? "not-started" : done >= total ? "completed" : "in-progress";

const punchlineKey = (index: number): TranslationKey =>
  `home.curriculum.module${index}.punchline` as TranslationKey;

// Derives the whole homepage curriculum view from the single navigation tree plus
// the earned-badge set: per-module cards and a global resume point. The resume
// point stays null until UserData is ready, so the prerendered/first-paint homepage
// is always the fresh-visitor state; the resume block is shown (and its tier chosen)
// by the caller from doneCount + auth.
export const useCurriculumProgress = (): CurriculumProgress => {
  const { t, language } = useTranslation();
  const { isEarned } = useBadges();
  const { status } = useUserData();

  return useMemo(() => {
    const modules = getNavigationTree(t).filter((node) => node.children);

    const cards: CurriculumCard[] = [];
    const flat: RouteName[] = [];

    modules.forEach((module, moduleIndex) => {
      const meta = CURRICULUM_MODULES[moduleIndex];
      if (!meta) return;

      const chapterIds = (module.children ?? [])
        .filter(
          (child): child is typeof child & { id: RouteName } =>
            Boolean(child.id) && child.kind !== "challenge",
        )
        .map((child) => child.id);

      chapterIds.forEach((id) => flat.push(id));
      const done = chapterIds.filter((id) => isEarned(id)).length;

      cards.push({
        index: moduleIndex + 1,
        nameKey: meta.nameKey,
        punchlineKey: punchlineKey(moduleIndex + 1),
        theme: meta.theme,
        notions: getModuleNotions(language, moduleIndex),
        chapterCount: chapterIds.length,
        minutes: getModuleReadingMinutes(chapterIds),
        state: moduleState(done, chapterIds.length),
        startRoute: chapterIds[0],
      });
    });

    const doneCount = flat.filter((id) => isEarned(id)).length;
    const firstUnearned = flat.findIndex((id) => !isEarned(id));

    const resume: CurriculumResume | null =
      status === "ready" && flat.length > 0
        ? {
            doneCount,
            totalCount: flat.length,
            resumeRoute: firstUnearned === -1 ? flat[0] : flat[firstUnearned],
            startRoute: flat[0],
          }
        : null;

    return {
      cards,
      moduleCount: cards.length,
      totalChapters: flat.length,
      totalMinutes: getModuleReadingMinutes(flat),
      resume,
    };
  }, [t, language, isEarned, status]);
};
