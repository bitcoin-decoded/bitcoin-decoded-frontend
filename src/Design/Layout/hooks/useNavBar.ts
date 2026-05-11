import { useEffect, useState, useMemo } from "react";
import { findPathToId } from "../helpers";
import {
  getNavigationTree,
  useRouterContext,
  type NavigationItem,
} from "../../../Routing";
import { useTranslation } from "../../../I18n";
import { useAccordion } from "./useAccordion";

/**
 * Navbar orchestrator. Composes:
 *   - the navigation tree (from i18n + route data)
 *   - the active path (which top-level module / chapter the user is on)
 *   - an exclusive-accordion state (one module open at a time)
 *   - a transient hover/focus id (for visual interaction feedback)
 *
 * The accordion state is auto-synced with the active path: when the
 * user navigates to a page (via a link, prev/next, deeplink), the
 * module that contains it is opened so the current chapter stays in
 * sight on mobile.
 */
export const useNavBar = () => {
  const { currentPage, setCurrentPage } = useRouterContext();
  const { t } = useTranslation();
  const navigationTree = useMemo(() => getNavigationTree(t), [t]);
  const activePath = useMemo(
    () => findPathToId(navigationTree, currentPage) || [],
    [navigationTree, currentPage],
  );

  const accordion = useAccordion<string>(activePath[0] ?? null);
  const [interactionId, setInteractionId] = useState<string | null>(null);

  // Keep the accordion in sync with the current page: opening (not
  // toggling) so a same-module re-navigation doesn't accidentally close
  // it. Closing is only ever user-driven (clicking the open module).
  useEffect(() => {
    if (activePath[0]) accordion.open(activePath[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath[0]]);

  const handleMenuClick = (item: NavigationItem) => {
    if (item.isPage && item.id) {
      setCurrentPage(item.id);
      return;
    }
    if (item.children) accordion.toggle(item.label);
  };

  return {
    navigationTree,
    openModule: accordion.openKey,
    handleMenuClick,
    activePath,
    interactionId,
    setInteractionId,
  };
};
