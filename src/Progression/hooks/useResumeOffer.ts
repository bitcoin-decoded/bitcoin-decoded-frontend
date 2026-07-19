import { useTranslation } from "../../I18n";
import { useRouterContext } from "../../Routing";

import { useChapterProgression } from "./useChapterProgression";

/**
 * Whether the reader reached this chapter without going through what precedes
 * it, and the offer to put them back on the path.
 *
 * Named after what it computes rather than after one of its renderings: the
 * banner shows it, and the block reader uses the same offer to replace a seal
 * button that would have nothing to seal.
 *
 * There is no "read it anyway" action: the notice sits in the flow with the
 * chapter right underneath, so reading on is what happens if nothing is
 * clicked. That was the point of choosing a banner over an overlay, and it is
 * also why this cannot fall foul of the interstitial rules that would have hurt
 * the very pages it appears on.
 */
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
    // Someone arriving from a search has no progress at all, which is the most
    // frequent case here and the one "resume at chapter 4" would make no sense
    // for.
    actionLabel: resume?.hasProgress
      ? `${t("progression.notice.resume")} ${String(resume.chapterNumber).padStart(2, "0")}`
      : t("progression.notice.start"),
    onAction: () => resume && setCurrentPage(resume.route),
  };
};
