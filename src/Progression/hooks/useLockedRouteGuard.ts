import { useEffect } from "react";

import { useRouterContext } from "../../Routing";

import { useChapterLock } from "./useChapterLock";

/**
 * Refuses a locked chapter reached by URL — a pasted link, a bookmark, a shared
 * address — and sends the reader to the chapter they may actually open.
 *
 * Returns whether a redirect is in flight, so the shell can render nothing for
 * that frame rather than flashing the material it is about to refuse.
 *
 * The history entry is *replaced*, never pushed: pushing would leave the
 * refused URL one step back, where Back would land on it and be redirected
 * again, trapping the reader.
 */
export const useLockedRouteGuard = (): boolean => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { isLocked, nextAvailableChapter } = useChapterLock();

  const isRefused = isLocked(currentPage);

  useEffect(() => {
    if (!isRefused) return;
    const target = nextAvailableChapter(currentPage);
    if (target) setCurrentPage(target, { replace: true });
  }, [isRefused, currentPage, nextAvailableChapter, setCurrentPage]);

  return isRefused;
};
