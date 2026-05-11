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

  const { openKey: openModule, toggle, open } = useAccordion<string>(
    activePath[0] ?? null,
  );
  const [interactionId, setInteractionId] = useState<string | null>(null);

  // Re-open the parent module on every navigation, even when the user
  // stays inside the same module. Depending on `activePath[0]` alone
  // would miss intra-module hops (closed module → click "next" at the
  // bottom of a chapter → next chapter is in the same module → its
  // parent stays closed). `activePath` is memoized on `currentPage`, so
  // its reference changes per navigation and gives us the right signal.
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
