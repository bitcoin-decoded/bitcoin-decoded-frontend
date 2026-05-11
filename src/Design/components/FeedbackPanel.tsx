import { type CSSProperties, type FC, type ReactNode } from "react";

import { withOpacity } from "../helpers";
import { useBreakpoint } from "../Responsive";
import { usePageTheme } from "../Theme";

type Tone = "success" | "error" | "info" | "neutral" | "world";
type Variant = "full" | "border-left";

type Props = {
  children: ReactNode;
  /**
   * Color recipe.
   * - `success` / `error` / `info`: semantic palette
   * - `neutral`: base border (quiet, hint-style)
   * - `world`: module accent
   * @default "info"
   */
  tone?: Tone;
  /**
   * - `full`: tinted bg + 1px border on all sides (default - most simulators)
   * - `border-left`: tinted bg + 3px accent stripe on the left edge (Quiz-like)
   * @default "full"
   */
  variant?: Variant;
  /** Optional leading icon, top-aligned. */
  icon?: ReactNode;
  /** Optional emphasized title rendered above the body. */
  title?: ReactNode;
  /** Optional inline style escape hatch (merged last). */
  style?: CSSProperties;
};

/**
 * Tinted feedback block with optional icon + title - used everywhere the
 * UI needs to acknowledge a result (success/failure), surface a hint,
 * or explain a constraint.
 *
 * Replaces ~12+ hand-rolled feedback panels across the Interactive
 * domain. Theme- and semantic-aware so the `tone` adapts to dark/light
 * via the centralized THEME_COLORS palette.
 */
export const FeedbackPanel: FC<Props> = ({
  children,
  tone = "info",
  variant = "full",
  icon,
  title,
  style,
}) => {
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  // Resolve accent color from tone.
  const accent =
    tone === "success"
      ? colors.semantic.success.text
      : tone === "error"
        ? colors.semantic.error.text
        : tone === "info"
          ? colors.semantic.info.text
          : tone === "world"
            ? colors[moduleTheme].text.secondary
            : colors.base.border.secondary;

  // Slightly bolder bg + border for `full` variant; lighter for `border-left`.
  const bgOpacity = variant === "border-left" ? 0.05 : 0.07;
  const borderOpacity = variant === "border-left" ? 0 : 0.18;

  const baseStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    padding: isMobile ? "0.7rem 0.85rem" : "0.75rem 1rem",
    borderRadius: "0.65rem",
    background: withOpacity(accent, bgOpacity),
    border:
      variant === "border-left" ? "none" : `1px solid ${withOpacity(accent, borderOpacity + 0.1)}`,
    borderLeft: variant === "border-left" ? `3px solid ${withOpacity(accent, 0.5)}` : undefined,
    color: colors.base.text.primary,
    fontSize: isMobile ? "0.66rem" : "0.7rem",
    lineHeight: 1.55,
    transition: "all 0.35s var(--ease-smooth)",
    ...style,
  };

  const titleStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: isMobile ? "0.68rem" : "0.72rem",
    fontWeight: 700,
    color: accent,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  // Two render modes:
  //   - With title: icon goes to the title row; body flows below.
  //   - Without title: icon (if any) sits inline with the body.
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
