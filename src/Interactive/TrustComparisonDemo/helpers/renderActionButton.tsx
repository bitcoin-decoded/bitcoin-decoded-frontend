import { Button } from "../../../Design";
import type { ActionState } from "../types";

// No icon: the two actions are named in full, and a glyph beside "créer de la
// monnaie" only repeated the label in a second alphabet.
export const renderActionButton = (
  state: ActionState,
  onClick: () => void,
  label: string,
  color?: string,
) => (
  <Button
    variant={state === "idle" ? "primary" : "secondary"}
    color={color}
    onClick={state === "idle" ? onClick : undefined}
    disabled={state !== "idle"}
    fullWidth
  >
    {label}
  </Button>
);
