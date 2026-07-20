import { type CSSProperties, type FC } from "react";

import { BRAND, Button, getTypography, useBreakpoint, usePageTheme } from "../../../Design";
import notFoundDark from "../../../Design/img/not_found_dark.webp";
import notFoundLight from "../../../Design/img/not_found_light.webp";
import { Illustration } from "../../../Interactive";
import { useNotFoundPage } from "../hooks";

import { DoodleSmileyCheeky } from "@doodle";

/**
 * The dead end, drawn rather than apologised for.
 *
 * The figure goes through `Illustration` rather than reproducing its frame, so
 * the corner brackets, the hairline, the hover and the mobile height cap are
 * the same here as in every chapter, and stay the same when they change there.
 *
 * The artwork itself is swapped on the theme instead of being tinted, which is
 * the one thing the component cannot do: the two versions are lit differently,
 * and a filter over the daylight one would give a grey desert at midnight
 * rather than a night sky.
 */
export const NotFoundPage: FC = () => {
  const { title, body, imageAlt, homeLabel, startLabel, goHome, goStart } = useNotFoundPage();
  const { colors, theme } = usePageTheme();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);

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

  // Sits on the text baseline rather than on its own line, so it reads as the
  // end of the sentence and not as a second illustration.
  const smileyStyle: CSSProperties = {
    display: "inline-block",
    verticalAlign: "-0.2em",
    marginLeft: "0.4rem",
    color: colors.base.text.secondary,
  };

  const actionsStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "0.75rem",
    width: isMobile ? "100%" : undefined,
  };

  return (
    <div style={containerStyle}>
      {/* The page supplies its own spacing, so the figure keeps none of its own. */}
      <Illustration
        src={theme === "dark" ? notFoundDark : notFoundLight}
        alt={imageAlt}
        margin="0 auto"
      />

      <h1 style={titleStyle}>{title}</h1>
      <p style={bodyStyle}>
        {body}
        <DoodleSmileyCheeky size={22} style={smileyStyle} aria-hidden />
      </p>

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
