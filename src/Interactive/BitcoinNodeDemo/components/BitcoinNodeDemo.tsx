import { type CSSProperties, type FC, type ReactNode } from "react";

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
import { useLanguageContext } from "../../../I18n";
import { useBitcoinNodeDemo } from "../hooks";

import { DoodleExeFile, DoodleLaptop } from "@doodle";

const EASE = "0.7s var(--ease-smooth)";

export const BitcoinNodeDemo: FC = () => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { language } = useLanguageContext();
  const fr = language === "fr";
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const world = colors[moduleTheme];
  const { isLaunched, handleLaunch, handleReset } = useBitcoinNodeDemo();

  const gold = getBrandGold(theme);
  const iconSize = isMobile ? 36 : 46;
  const tileWidth = isMobile ? "8.5rem" : "11rem";

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: isMobile ? "1.25rem" : "1.75rem",
    width: "100%",
    margin: isMobile ? "1.5rem 0" : "2rem 0",
  };

  // The frame that closes around the pair once they have met. Its corner
  // brackets are the same device the callouts and illustrations use.
  const stageStyle: CSSProperties = {
    position: "relative",
    padding: isMobile ? "1rem 0.75rem" : "1.25rem 1.5rem",
    transition: `background ${EASE}`,
    background: isLaunched ? withOpacity(world.background.secondary, 0.08) : "transparent",
  };

  const cornerSize = isMobile ? 10 : 14;
  const corners = (): ReactNode => {
    const stroke = `${BRAND.figures.ruleThickness}px solid ${gold}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      opacity: isLaunched ? 1 : 0,
      transition: `opacity ${EASE}`,
      pointerEvents: "none",
    };
    return (
      <>
        <span style={{ ...base, top: 0, left: 0, borderTop: stroke, borderLeft: stroke }} />
        <span style={{ ...base, top: 0, right: 0, borderTop: stroke, borderRight: stroke }} />
        <span style={{ ...base, bottom: 0, left: 0, borderBottom: stroke, borderLeft: stroke }} />
        <span style={{ ...base, bottom: 0, right: 0, borderBottom: stroke, borderRight: stroke }} />
      </>
    );
  };

  // The two halves stay mounted and travel: the gap closes rather than one
  // state being swapped for another, so the merge is something you watch
  // happen. Side by side at every width, since the pair only reads as a pair
  // while they face each other.
  const pairStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    // Closed to a hairline rather than to nothing: touching, the two 1px
    // borders would stack into a 2px seam and read as a heavier rule.
    gap: isLaunched ? "0.35rem" : isMobile ? "0.75rem" : "2rem",
    transition: `gap ${EASE}`,
  };

  const tileStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: isMobile ? "0.6rem" : "0.8rem",
    width: tileWidth,
    padding: isMobile ? "0.9rem 0.6rem" : "1.1rem 1rem",
    borderRadius: 0,
    // A wash rather than a slab. `background.tertiary` is an opaque grey, and
    // dropped into the warm tint of a callout it punched a cold hole through
    // it. Translucent, the tile lifts off whatever it is actually sitting on.
    background: isLaunched
      ? withOpacity(world.background.secondary, 0.1)
      : withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.04),
    // One border, four equal sides, in every state. Hiding the seam by clearing
    // a single edge left that edge out of step with the other three, and it
    // read as a heavier rule rather than as no rule at all.
    border: `1px solid ${
      isLaunched ? withOpacity(world.border.secondary, 0.55) : colors.base.border.secondary
    }`,
    color: isLaunched ? world.text.secondary : colors.base.text.secondary,
    transition: `background ${EASE}, border-color ${EASE}, color ${EASE}`,
  };

  // The label carries the component's primary information, so it takes the
  // label role whole rather than a micro size with a weight bolted on: Cutive
  // Mono ships a single weight, and 500 only synthesised a coarse faux bold.
  const labelStyle: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    textAlign: "center",
    lineHeight: 1.25,
    minHeight: "2.5em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const resultStyle: CSSProperties = {
    ...typo.label,
    fontVariant: "small-caps",
    textAlign: "center",
    color: world.text.secondary,
    opacity: isLaunched ? 1 : 0,
    transform: isLaunched ? "translateY(0)" : "translateY(-0.4rem)",
    transition: `opacity ${EASE}, transform ${EASE}`,
    minHeight: "1.5em",
  };

  return (
    <div style={wrapStyle}>
      <div style={stageStyle}>
        {corners()}
        <div style={pairStyle}>
          <div style={tileStyle}>
            <DoodleLaptop size={iconSize} />
            <span style={labelStyle}>{fr ? "Ordinateur" : "Computer"}</span>
          </div>
          <div style={tileStyle}>
            <DoodleExeFile size={iconSize} />
            <span style={labelStyle}>{fr ? "Logiciel Bitcoin" : "Bitcoin software"}</span>
          </div>
        </div>
      </div>

      <span style={resultStyle}>{fr ? "= un nœud du réseau" : "= a network node"}</span>

      <Button
        variant={isLaunched ? "secondary" : "primary"}
        onClick={isLaunched ? handleReset : handleLaunch}
      >
        {isLaunched
          ? fr
            ? "Réinitialiser"
            : "Reset"
          : fr
            ? "Démarrer le nœud"
            : "Run the node"}
      </Button>
    </div>
  );
};
