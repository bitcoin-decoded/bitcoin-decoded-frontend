import { useMemo } from "react";

import { useBadges } from "../../../Achievements";
import { type TranslationKey, useTranslation } from "../../../I18n";
import { getNavigationTree, type RouteName } from "../../../Routing";
import { useUserData } from "../../../UserData";
import { CURRICULUM_MODULES, getModuleNotions } from "../data";
import { getModuleReadingMinutes } from "../helpers";
import type { CurriculumCard, CurriculumProgress, CurriculumResume, ModuleState } from "../types";

type FlatChapter = {
  id: RouteName;
  label: string;
  moduleIndex: number;
  numberInModule: number;
  moduleNameKey: TranslationKey;
};

const moduleState = (done: number, total: number): ModuleState =>
  done === 0 ? "not-started" : done >= total ? "completed" : "in-progress";

const punchlineKey = (index: number): TranslationKey =>
  `home.curriculum.module${index}.punchline` as TranslationKey;

// Derives the whole homepage curriculum view from the single navigation tree plus
// the earned-badge set: per-module cards (state + reading time + notions) and a
// global resume point. Progress-dependent output stays inert until UserData is
// ready, so the prerendered/first-paint homepage is always the fresh-visitor state.
export const useCurriculumProgress = (): CurriculumProgress => {
  const { t, language } = useTranslation();
  const { isEarned } = useBadges();
  const { status } = useUserData();

  return useMemo(() => {
    const modules = getNavigationTree(t).filter((node) => node.children);

    const cards: CurriculumCard[] = [];
    const flat: FlatChapter[] = [];

    modules.forEach((module, moduleIndex) => {
      const meta = CURRICULUM_MODULES[moduleIndex];
      if (!meta) return;

      const chapters = (module.children ?? []).filter(
        (child): child is typeof child & { id: RouteName } =>
          Boolean(child.id) && child.kind !== "challenge",
      );

      chapters.forEach((chapter, chapterIndex) =>
        flat.push({
          id: chapter.id,
          label: chapter.label,
          moduleIndex: moduleIndex + 1,
          numberInModule: chapterIndex + 1,
          moduleNameKey: meta.nameKey,
        }),
      );

      const chapterIds = chapters.map((chapter) => chapter.id);
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

    const doneCount = flat.filter((chapter) => isEarned(chapter.id)).length;
    const totalChapters = flat.length;
    const totalMinutes = getModuleReadingMinutes(flat.map((chapter) => chapter.id));

    const firstUnearned = flat.findIndex((chapter) => !isEarned(chapter.id));
    const allDone = firstUnearned === -1;
    const target = allDone ? flat[0] : flat[firstUnearned];
    const remaining = flat.filter((chapter) => !isEarned(chapter.id));

    const resume: CurriculumResume | null =
      status === "ready" && doneCount > 0 && target
        ? {
            moduleIndex: target.moduleIndex,
            moduleNameKey: target.moduleNameKey,
            chapterNumberInModule: target.numberInModule,
            chapterLabel: target.label,
            route: target.id,
            doneCount,
            totalCount: totalChapters,
            remainingCount: remaining.length,
            remainingMinutes: getModuleReadingMinutes(remaining.map((chapter) => chapter.id)),
            allDone,
          }
        : null;

    return {
      cards,
      moduleCount: cards.length,
      totalChapters,
      totalMinutes,
      hasProgress: resume !== null,
      resume,
    };
  }, [t, language, isEarned, status]);
};
