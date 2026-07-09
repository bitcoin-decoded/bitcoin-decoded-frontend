import { createContext, useContext } from "react";

import type { BadgesStore } from "../types";

export const BadgeContext = createContext<BadgesStore | null>(null);

export const useBadges = (): BadgesStore => {
  const ctx = useContext(BadgeContext);
  if (!ctx) throw new Error("useBadges must be used within a BadgeProvider");
  return ctx;
};
