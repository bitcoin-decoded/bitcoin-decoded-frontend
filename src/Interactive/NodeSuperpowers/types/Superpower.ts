import { type ReactNode } from "react";

export type Superpower = {
  icon: ReactNode;
  label: ReactNode;
  body: ReactNode;
  // A recalled power, drawn back and dimmed (the shared node abilities on the
  // mining side). Recalled powers are not required to clear the exploration gate.
  muted?: boolean;
  // The power being introduced here, given a soft accent so it reads as an
  // addition rather than as the currently selected tile.
  highlight?: boolean;
};
