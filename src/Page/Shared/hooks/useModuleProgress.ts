import { useTranslation } from "../../../I18n";
import { useChapterProgression } from "../../../Progression";
import { getNavigationTree, type RouteName, useRouterContext } from "../../../Routing";
import { getModuleChapters, type ModuleChapters } from "../helpers";

type ModuleProgress = ModuleChapters & {
  goTo: (id: RouteName) => void;
  isOutOfSequence: (id: RouteName) => boolean;
};

export const useModuleProgress = (): ModuleProgress | null => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { t } = useTranslation();
  const { isOutOfSequence } = useChapterProgression();

  const module = getModuleChapters(getNavigationTree(t), currentPage);
  if (!module) return null;

  return { ...module, goTo: setCurrentPage, isOutOfSequence };
};
