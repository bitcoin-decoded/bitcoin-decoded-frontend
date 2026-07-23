import type { CSSProperties, ReactNode } from "react";

import type { ActionState } from "../types";

import { DoodleSmileyGrumpy, DoodleSmileyHappy } from "@doodle";

// The face carries the outcome, not a colour. Red and green said the opposite
// of what happened here: creating money out of thin air succeeded, and that is
// the bad news; the attempt on Bitcoin failed, and that is the good news.
export const renderFeedback = (
  state: ActionState,
  message: ReactNode,
  accent: string,
  textStyle: CSSProperties,
) => {
  if (state === "idle") return null;
  const Face = state === "success" ? DoodleSmileyGrumpy : DoodleSmileyHappy;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
      <Face size={22} style={{ flexShrink: 0, color: accent, marginTop: "0.05rem" }} />
      <span style={textStyle}>{message}</span>
    </div>
  );
};
