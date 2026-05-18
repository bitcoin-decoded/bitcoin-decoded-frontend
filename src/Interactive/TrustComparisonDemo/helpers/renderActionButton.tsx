import type { ReactNode } from "react";

import { Button } from "../../../Design";
import type { ActionState } from "../types";

export const renderActionButton = (
  state: ActionState,
  accentColor: string,
  onClick: () => void,
  icon: ReactNode,
  label: string,
  borderSecondary: string,
) => (
  <Button
    variant={state === "idle" ? "primary" : "secondary"}
    color={state === "idle" ? accentColor : borderSecondary}
    icon={icon}
    onClick={state === "idle" ? onClick : undefined}
    disabled={state !== "idle"}
    fullWidth
  >
    {label}
  </Button>
);
