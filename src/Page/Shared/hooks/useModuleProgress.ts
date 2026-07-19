import { useTranslation } from "../../../I18n";
import { getNavigationTree, type RouteName, useRouterContext } from "../../../Routing";
import { getModuleChapters, type ModuleChapters } from "../helpers";

type ModuleProgress = ModuleChapters & {
  goTo: (id: RouteName) => void;
};

/**
 * The current module's chapters and where the reader sits among them. Null on
 * pages with no module parent, where a module rail would mean nothing.
 *
 * Deliberately unaware of badges: the rail marks the chapter being read and
 * nothing else — a second "finished" marker only competed with that one.
 */
export const useModuleProgress = (): ModuleProgress | null => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { t } = useTranslation();

  const module = getModuleChapters(getNavigationTree(t), currentPage);
  if (!module) return null;

  return { ...module, goTo: setCurrentPage };
};
