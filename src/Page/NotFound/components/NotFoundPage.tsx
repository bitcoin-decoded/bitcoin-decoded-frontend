import { type CSSProperties, type FC } from "react";

import {
  BRAND,
  Button,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import notFoundDark from "../../../Design/img/not_found_dark.webp";
import notFoundLight from "../../../Design/img/not_found_light.webp";
import { useNotFoundPage } from "../hooks";

/**
 * The dead end, drawn rather than apologised for.
 *
 * The illustration is swapped on the theme instead of being tinted by CSS: both
 * versions are lit differently, and a filter over the light one would give a
 * grey desert at midnight rather than a night sky.
 */
export const NotFoundPage: FC = () => {
  const { title, body, imageAlt, homeLabel, startLabel, goHome, goStart } = useNotFoundPage();
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const gold = getBrandGold(theme);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: isMobile ? "1.25rem" : "1.5rem",
    padding: isMobile ? "1.5rem 0 3rem" : "2.5rem 0 4rem",
    maxWidth: "44rem",
    margin: "0 auto",
  };

  // Hairline frame, no radius: the same register every framed figure in the
  // project uses.
  const figureStyle: CSSProperties = {
    margin: 0,
    width: "100%",
    border: `${BRAND.figures.ruleThickness}px solid ${withOpacity(gold, 0.4)}`,
    lineHeight: 0,
  };

  const imageStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
  };

  const titleStyle: CSSProperties = {
    ...typo.heading,
    fontFamily: BRAND.fonts.display,
    color: colors.base.text.primary,
    margin: 0,
    textWrap: "balance",
  };

  const bodyStyle: CSSProperties = {
    ...typo.prose,
    color: colors.base.text.secondary,
    margin: 0,
    maxWidth: "34rem",
  };

  const actionsStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "0.75rem",
    width: isMobile ? "100%" : undefined,
  };

  return (
    <div style={containerStyle}>
      <figure style={figureStyle}>
        <img
          src={theme === "dark" ? notFoundDark : notFoundLight}
          alt={imageAlt}
          style={imageStyle}
          width={1536}
          height={1024}
        />
      </figure>

      <h1 style={titleStyle}>{title}</h1>
      <p style={bodyStyle}>{body}</p>

      <div style={actionsStyle}>
        <Button variant="primary" onClick={goStart} fullWidth={isMobile}>
          {startLabel}
        </Button>
        <Button variant="secondary" onClick={goHome} fullWidth={isMobile}>
          {homeLabel}
        </Button>
      </div>
    </div>
  );
};
