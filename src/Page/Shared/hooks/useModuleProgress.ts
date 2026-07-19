import { useTranslation } from "../../../I18n";
import { useChapterLock } from "../../../Progression";
import { getNavigationTree, type RouteName, useRouterContext } from "../../../Routing";
import { getModuleChapters, type ModuleChapters } from "../helpers";

type ModuleProgress = ModuleChapters & {
  goTo: (id: RouteName) => void;
  /** Same verdict the navbar and the route guard read — see `Progression`. */
  isLocked: (id: RouteName) => boolean;
};

/**
 * The current module's chapters and where the reader sits among them. Null on
 * pages with no module parent, where a module rail would mean nothing.
 *
 * Deliberately unaware of badges for *completion*: the rail marks the chapter
 * being read and nothing else, since a second "finished" marker only competed
 * with that one. Locking is different — it decides what may be clicked — and is
 * read from `Progression` rather than recomputed here.
 */
export const useModuleProgress = (): ModuleProgress | null => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { t } = useTranslation();
  const { isLocked } = useChapterLock();

  const module = getModuleChapters(getNavigationTree(t), currentPage);
  if (!module) return null;

  return { ...module, goTo: setCurrentPage, isLocked };
};
