import { useBadges } from "../../../Achievements";
import { useTranslation } from "../../../I18n";
import { getNavigationTree, type RouteName, useRouterContext } from "../../../Routing";
import { getModuleChapters, type ModuleChapters } from "../helpers";

type ModuleProgress = ModuleChapters & {
  /** Has this chapter been finished? (its badge is earned) */
  isDone: (id: RouteName) => boolean;
  goTo: (id: RouteName) => void;
};

/**
 * The current module's chapters, where the reader is inside it, and what they
 * have already finished — everything the progress rail needs. Null on pages
 * with no module parent, where a module rail would mean nothing.
 */
export const useModuleProgress = (): ModuleProgress | null => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { t } = useTranslation();
  const { isEarned } = useBadges();

  const module = getModuleChapters(getNavigationTree(t), currentPage);
  if (!module) return null;

  return {
    ...module,
    // A chapter badge's id *is* its route name (see the badge catalogue).
    isDone: (id) => isEarned(id),
    goTo: setCurrentPage,
  };
};
