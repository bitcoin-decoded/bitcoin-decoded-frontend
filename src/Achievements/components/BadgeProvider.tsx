import { type FC, type ReactNode } from "react";

import { BadgeContext, useBadgesStore } from "../hooks";

import { BadgeUnlockOverlay } from "./BadgeUnlockOverlay";

/**
 * Owns the badge store and exposes it via context, and renders the one global
 * unlock overlay. Mounts high (around the app shell) so `award()` is reachable
 * from the reading engine and the synthesis quizzes, and the celebration shows
 * over any page.
 */
export const BadgeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const store = useBadgesStore();

  return (
    <BadgeContext.Provider value={store}>
      {children}
      <BadgeUnlockOverlay badge={store.celebration} onDismiss={store.dismissCelebration} />
    </BadgeContext.Provider>
  );
};
