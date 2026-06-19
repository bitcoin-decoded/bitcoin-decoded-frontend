import type { ReactNode } from "react";

import { Button } from "../../../Design";
import type { ActionState } from "../types";

/**
 * Standard primary CTA (same recipe as "Démarrer le nœud"): the module accent
 * with readable text. No per-call color override - overriding `color` with a
 * low-opacity border tone is exactly what made the label wash out before.
 */
export const renderActionButton = (
  state: ActionState,
  onClick: () => void,
  icon: ReactNode,
  label: string,
) => (
  <Button
    variant={state === "idle" ? "primary" : "secondary"}
    icon={icon}
    onClick={state === "idle" ? onClick : undefined}
    disabled={state !== "idle"}
    fullWidth
  >
    {label}
  </Button>
);
