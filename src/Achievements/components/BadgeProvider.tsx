import { type FC, type ReactNode } from "react";

import { BadgeContext, useBadgesStore } from "../hooks";

import { BadgeUnlockOverlay } from "./BadgeUnlockOverlay";

export const BadgeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const store = useBadgesStore();

  return (
    <BadgeContext.Provider value={store}>
      {children}
      <BadgeUnlockOverlay badge={store.celebration} onDismiss={store.dismissCelebration} />
    </BadgeContext.Provider>
  );
};
