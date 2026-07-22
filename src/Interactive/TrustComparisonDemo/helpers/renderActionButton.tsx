import type { ReactNode } from "react";

import { Button } from "../../../Design";
import type { ActionState } from "../types";

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
