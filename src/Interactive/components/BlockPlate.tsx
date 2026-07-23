import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../Design";

type Props = {
  title: ReactNode;
  children: ReactNode;
  frameColor?: string;
  style?: CSSProperties;
};

export const BlockPlate: FC<Props> = ({ title, children, frameColor, style }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();

  const frame = frameColor ?? getBrandGold(theme);

  // A wash rather than a fill: the plate is dropped inside tinted callouts, and
  // an opaque surface punched a cold hole through them.
  const plateStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    width: "100%",
    boxSizing: "border-box",
    padding: isMobile ? "0.9rem 0.75rem" : "1.1rem 1.25rem",
    background: withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.035),
    border: `${BRAND.figures.ruleThickness}px solid ${colors.base.border.tertiary}`,
    transition: "border-color 0.3s var(--ease-smooth)",
    ...style,
  };

  const titleStyle: CSSProperties = {
    ...typo.heading,
    fontVariant: "small-caps",
    color: colors.base.text.primary,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.5rem",
    paddingBottom: "0.6rem",
    marginBottom: "0.35rem",
    borderBottom: `${BRAND.figures.ruleThickness}px solid ${withOpacity(frame, 0.45)}`,
  };

  const cornerSize = isMobile ? 9 : 12;
  const corners = (): ReactNode => {
    const stroke = `${BRAND.figures.ruleThickness}px solid ${frame}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      pointerEvents: "none",
    };
    return (
      <>
        <span style={{ ...base, top: -1, left: -1, borderTop: stroke, borderLeft: stroke }} />
        <span style={{ ...base, top: -1, right: -1, borderTop: stroke, borderRight: stroke }} />
        <span style={{ ...base, bottom: -1, left: -1, borderBottom: stroke, borderLeft: stroke }} />
        <span style={{ ...base, bottom: -1, right: -1, borderBottom: stroke, borderRight: stroke }} />
      </>
    );
  };

  return (
    <div style={plateStyle}>
      {corners()}
      <div style={titleStyle}>{title}</div>
      {children}
    </div>
  );
};
