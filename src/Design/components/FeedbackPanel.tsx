import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { getTypography, usePageTheme } from "../Theme";

type Tone = "success" | "error" | "info" | "warning" | "neutral" | "world";
type Variant = "full" | "border-left";

type Props = {
  children: ReactNode;
  tone?: Tone;
  variant?: Variant;
  icon?: ReactNode;
  title?: ReactNode;
  style?: CSSProperties;
};

export const FeedbackPanel: FC<Props> = ({
  children,
  tone = "info",
  variant = "full",
  icon,
  title,
  style,
}) => {
  const breakpoint = useBreakpoint();
  const typo = getTypography(breakpoint);
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const accent =
    tone === "success"
      ? colors.semantic.success.text
      : tone === "error"
        ? colors.semantic.error.text
        : tone === "info"
          ? colors.semantic.info.text
          : tone === "warning"
            ? colors.semantic.warning.text
            : tone === "world"
              ? colors[moduleTheme].text.secondary
              : colors.base.border.secondary;

  const bgOpacity = variant === "border-left" ? 0.05 : 0.07;
  const borderOpacity = variant === "border-left" ? 0 : 0.18;

  const baseStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: isMobile ? "0.75rem 0.9rem" : "0.85rem 1rem",
    borderRadius: 0,
    background: withOpacity(accent, bgOpacity),
    border:
      variant === "border-left" ? "none" : `1px solid ${withOpacity(accent, borderOpacity + 0.1)}`,
    borderLeft:
      variant === "border-left"
        ? `3px solid ${withOpacity(accent, 0.5)}`
        : `3px solid ${withOpacity(accent, 0.8)}`,
    color: colors.base.text.primary,
    ...typo.note,
    transition: "all 0.35s var(--ease-smooth)",
    ...style,
  };

  const titleStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    ...typo.heading,
    color: accent,
    fontVariant: "small-caps",
  };

  const hasTitle = Boolean(title);

  return (
    <div style={baseStyle}>
      {hasTitle && (
        <div style={titleStyle}>
          {icon}
          {title}
        </div>
      )}
      {children && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            color: colors.base.text.primary,
          }}
        >
          {!hasTitle && icon && <span style={{ flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>}
          <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        </div>
      )}
    </div>
  );
};
