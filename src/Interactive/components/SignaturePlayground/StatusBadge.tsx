import { type FC, type ReactNode } from "react";

import { withOpacity } from "../../../Design/helpers";
import type { SigPlaygroundColors, StatusTone } from "../../types";

type Props = {
  tone: StatusTone;
  icon: ReactNode;
  label: string;
  colors: SigPlaygroundColors;
};

/**
 * Compact pill that shows a labelled state (success / error / muted).
 * Used inside the signature output panel and the verification result panel.
 */
export const StatusBadge: FC<Props> = ({ tone, icon, label, colors }) => {
  const palette =
    tone === "success"
      ? {
          color: colors.successColor,
          bg: withOpacity(colors.successColor, 0.1),
          border: withOpacity(colors.successColor, 0.3),
        }
      : tone === "error"
        ? {
            color: colors.errorColor,
            bg: withOpacity(colors.errorColor, 0.1),
            border: withOpacity(colors.errorColor, 0.3),
          }
        : {
            color: colors.baseTextSecondary,
            bg: withOpacity(colors.baseBorderSecondary, 0.06),
            border: withOpacity(colors.baseBorderSecondary, 0.18),
          };

  return (
    <span
      style={{
        display: "inline-flex",
        alignSelf: "flex-start",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.3rem 0.55rem",
        borderRadius: "0.45rem",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.6rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: palette.color,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        maxWidth: "100%",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </span>
  );
};
