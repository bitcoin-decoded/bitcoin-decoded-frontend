import { createContext, useContext } from "react";

import type { BadgesStore } from "./useBadgesStore";

export const BadgeContext = createContext<BadgesStore | null>(null);

/** Access the badge store. Must be used within a <BadgeProvider>. */
export const useBadges = (): BadgesStore => {
  const ctx = useContext(BadgeContext);
  if (!ctx) throw new Error("useBadges must be used within a BadgeProvider");
  return ctx;
};
