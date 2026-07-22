import { useTranslation } from "../../../I18n";
import { getNavigationTree, useRouterContext } from "../../../Routing";
import { getChapterPosition } from "../helpers";

type ChapterKicker = {
  marker: string;
  label: string;
};

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
