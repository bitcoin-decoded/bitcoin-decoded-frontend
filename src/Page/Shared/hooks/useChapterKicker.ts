import { useTranslation } from "../../../I18n";
import { getNavigationTree, useRouterContext } from "../../../Routing";
import { getChapterPosition } from "../helpers";

type ChapterKicker = {
  /** Accent segment, e.g. "Chapitre 03". */
  marker: string;
  /** Context segment — the module name. */
  label: string;
};

/**
 * Derives the numbered chapter eyebrow for the current page from the navigation
 * tree. Returns null when there's nothing to number: standalone pages, or the
 * end-of-module quiz (celebrated by its badge, not a chapter number).
 */
export const useChapterKicker = (): ChapterKicker | null => {
  const { currentPage } = useRouterContext();
  const { t } = useTranslation();

  const position = getChapterPosition(getNavigationTree(t), currentPage);
  if (!position || position.isChallenge) return null;

  const number = String(position.number).padStart(2, "0");
  return {
    marker: `${t("chapterLabel.chapter")} ${number}`,
    label: position.moduleLabel,
  };
};
