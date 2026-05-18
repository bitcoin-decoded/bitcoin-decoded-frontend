import type { FC, ReactNode } from "react";

export const HiddenForAI: FC<{ children: ReactNode }> = ({ children }) => (
  <span
    aria-hidden="true"
    style={{
      position: "absolute",
      left: "-9999px",
      width: "1px",
      height: "1px",
      overflow: "hidden",
      opacity: 0,
      pointerEvents: "none",
    }}
  >
    {children}
  </span>
);
