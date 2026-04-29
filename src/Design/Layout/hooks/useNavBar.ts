import { useEffect, useState, useMemo } from "react";
import { findAllDescendantLabels, findPathToId } from "../helpers";
import {
  getNavigationTree,
  useRouterContext,
  type NavigationItem,
} from "../../../Routing";
import { useTranslation } from "../../../I18n";

export const useNavBar = () => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { t } = useTranslation();
  const navigationTree = useMemo(() => getNavigationTree(t), [t]);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const activePath = useMemo(
    () => findPathToId(navigationTree, currentPage) || [],
    [navigationTree, currentPage]
  );
  const [interactionId, setInteractionId] = useState<string | null>(null);

  useEffect(() => {
    setOpenMenus(new Set(activePath));
  }, [activePath]);

  const handleMenuClick = (item: NavigationItem) => {
    if (item.isPage && item.id) setCurrentPage(item.id);
    else if (item.children)
      setOpenMenus((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(item.label)) {
          newSet.delete(item.label);
          const descendantLabels = findAllDescendantLabels(item);
          descendantLabels.forEach((label) => newSet.delete(label));
        } else newSet.add(item.label);
        return newSet;
      });
  };
  return {
    navigationTree,
    openMenus,
    handleMenuClick,
    activePath,
    interactionId,
    setInteractionId,
  };
};
