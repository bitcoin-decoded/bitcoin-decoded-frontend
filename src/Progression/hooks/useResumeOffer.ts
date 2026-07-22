import { useTranslation } from "../../I18n";
import { useRouterContext } from "../../Routing";

import { useChapterProgression } from "./useChapterProgression";

export const useResumeOffer = () => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { isOutOfSequence, resumePoint } = useChapterProgression();
  const { t } = useTranslation();

  const resume = resumePoint(currentPage);
  const show = isOutOfSequence(currentPage) && resume !== null;

  return {
    show,
    title: t("progression.notice.title"),
    body: t("progression.notice.body"),
    actionLabel: resume?.hasProgress
      ? `${t("progression.notice.resume")} ${String(resume.chapterNumber).padStart(2, "0")}`
      : t("progression.notice.start"),
    onAction: () => resume && setCurrentPage(resume.route),
  };
};
