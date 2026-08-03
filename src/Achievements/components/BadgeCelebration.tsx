import { type FC } from "react";

import { useBadges } from "../hooks";

import { BadgeUnlockOverlay } from "./BadgeUnlockOverlay";

// Self-contained celebration: reads the current queued badge and renders the
// unlock overlay. Mounted once inside the ready app, replacing the wiring that
// used to live in the badge provider.
export const BadgeCelebration: FC = () => {
  const { celebration, dismissCelebration } = useBadges();

  return <BadgeUnlockOverlay badge={celebration} onDismiss={dismissCelebration} />;
};
