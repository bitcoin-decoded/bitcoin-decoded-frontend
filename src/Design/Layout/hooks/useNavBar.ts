import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "../../../I18n";
import { getNavigationTree, type NavigationItem, useRouterContext } from "../../../Routing";
import { findPathToId } from "../helpers";

import { useAccordion } from "./useAccordion";

export const useNavBar = () => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { t } = useTranslation();
  const navigationTree = useMemo(() => getNavigationTree(t), [t]);
  const activePath = useMemo(
    () => findPathToId(navigationTree, currentPage) || [],
    [navigationTree, currentPage],
  );

  const { openKey: openModule, toggle, open } = useAccordion<string>(activePath[0] ?? null);
  const [interactionId, setInteractionId] = useState<string | null>(null);

  useEffect(() => {
    if (activePath[0]) open(activePath[0]);
  }, [activePath, open]);

  const handleMenuClick = (item: NavigationItem) => {
    if (item.isPage && item.id) {
      setCurrentPage(item.id);
      return;
    }
    if (item.children) toggle(item.label);
  };

  return {
    navigationTree,
    openModule,
    handleMenuClick,
    activePath,
    interactionId,
    setInteractionId,
  };
};
