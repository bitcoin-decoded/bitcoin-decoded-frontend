import { type CSSProperties, type FC, Fragment, useState } from "react";

import {
  BRAND,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import { useModuleProgress } from "../hooks";

import { DoodleLock } from "@doodle";

/**
 * The module's chapters as one unbroken rail — Chap. [01]—02—03—Quiz — sitting
 * directly above the block ribbon so the two read as a pair: this one moves
 * between chapters, the one below between blocks. Each is prefixed with what it
 * navigates so they cannot be confused.
 *
 * Three states, three colours, and no fourth invented for the occasion:
 *
 *   reading   the module's gold, filled, with the page ground as its ink
 *   open      the module's own accent, the identity colour it already wears
 *   locked    the neutral secondary text token, plus a padlock
 *
 * Gold is structure and marks position; the module accent is identity and marks
 * what is open. Both come from `THEME_COLORS`, whose text tokens are held to
 * WCAG AA on either ground by `THEME_COLORS.test.ts`, so neither needs a
 * light-mode variant invented here.
 *
 * Nothing signals "finished": that is the badge's job, and a second marker here
 * only competed with this one.
 */
export const ModuleProgress: FC = () => {
  const progress = useModuleProgress();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<RouteName | null>(null);

  if (!progress || progress.chapters.length < 2) return null;

  const gold = getBrandGold(theme);
  const moduleAccent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;
  const currentId = progress.chapters[progress.currentIndex].id;

  // Narrow screens trade the rule for a middot. Seven chapters plus their links
  // do not fit on one line at 375px, and a rail that wraps onto two lines stops
  // reading as a rail at all.
  const linkWidth = isMobile ? 0 : 16;

  // Two elements, for one reason: the rail must never wrap onto a second line,
  // and a nine-chapter module at 375px wants about 350px against roughly 350
  // available. It fits, but with nothing to spare, and a longer module or a
  // wider glyph would break it.
  //
  // So the outer element scrolls and the inner one is sized to its content:
  // under the available width `margin: auto` centres it as usual, over it the
  // rail slides instead of wrapping or pushing the page sideways. The
  // scrollbar itself is hidden by the shared `.no-scrollbar` utility.
  const scrollerStyle: CSSProperties = {
    overflowX: "auto",
    maxWidth: "100%",
    margin: isMobile ? "0 0 1.25rem" : "0 0 1.5rem",
  };

  const railStyle: CSSProperties = {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    width: "max-content",
    margin: "0 auto",
    // Zero, deliberately: the links are the only thing between two chapters, so
    // the rule runs edge to edge instead of breaking into dashes.
    gap: 0,
  };

  // Weight 400, not 600. The pair of prefixes sets the context and should not
  // compete with the figures they introduce.
  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: typo.label.fontSize,
    fontWeight: 400,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: gold,
    marginRight: isMobile ? "0.3rem" : "0.55rem",
    flex: "0 0 auto",
  };

  const linkStyle: CSSProperties = {
    flex: "0 0 auto",
    width: linkWidth,
    height: BRAND.figures.ruleThickness,
    background: withOpacity(gold, 0.45),
  };

  const dotStyle: CSSProperties = {
    flex: "0 0 auto",
    ...typo.micro,
    color: withOpacity(gold, 0.55),
    padding: "0 0.13rem",
    lineHeight: 1,
  };

  const figureColor = (isCurrent: boolean, isLocked: boolean, isHovered: boolean): string => {
    if (isCurrent) return colors.base.background.primary;
    if (isLocked) return colors.base.text.secondary;
    return isHovered ? gold : moduleAccent;
  };

  const figureStyle = (
    isCurrent: boolean,
    isLocked: boolean,
    isHovered: boolean,
  ): CSSProperties => ({
    ...typo.figure,
    fontFamily: BRAND.fonts.mono,
    color: figureColor(isCurrent, isLocked, isHovered),
    // Tracking is a luxury the narrow rail cannot afford: across the twenty-odd
    // glyphs of a nine-chapter module it alone costs more than a chapter cell.
    letterSpacing: isMobile ? "0.02em" : "0.06em",
    transition: "color 0.2s var(--ease-smooth)",
  });

  // Sits at the numeral's bottom-right corner, smaller than the figure on
  // purpose: the size gap is what makes the padlock read as an annotation on
  // the number rather than as its equal.
  const lockSize = 12;
  const lockStyle: CSSProperties = {
    position: "absolute",
    right: -lockSize * 0.55,
    bottom: -lockSize * 0.3,
    color: colors.base.text.secondary,
    pointerEvents: "none",
  };

  // The chapter being read: a filled gold cartouche, square like everything
  // structural here. Filled rather than outlined because it has to win against
  // six siblings wearing a saturated accent.
  const cartoucheStyle: CSSProperties = {
    background: gold,
    padding: isMobile ? "0.15rem 0.3rem" : "0.2rem 0.4rem",
  };

  const cellStyle = (isCurrent: boolean, isLocked: boolean): CSSProperties => {
    const side = isMobile ? "0.09rem" : "0.3rem";
    return {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      flex: "0 0 auto",
      // The rule stops short of the glyphs rather than touching them; the
      // cartouche brings its own padding and needs none.
      //
      // A locked chapter reserves the padlock's overhang on its right as
      // padding rather than margin. As margin it pushed the following link
      // away and punched a hole in the rule, which is the one thing this rail
      // is not allowed to have.
      padding: isCurrent ? 0 : `0 ${isLocked ? `${lockSize * 0.45}px` : side} 0 ${side}`,
      border: "none",
      borderRadius: 0,
      background: "transparent",
      cursor: isLocked ? "not-allowed" : isCurrent ? "default" : "pointer",
    };
  };

  return (
    <div className="no-scrollbar" style={scrollerStyle}>
      <nav aria-label={progress.moduleLabel} style={railStyle}>
        <span style={labelStyle}>{t("moduleProgress.label")}</span>

        {progress.chapters.map((chapter, index) => {
          const isCurrent = chapter.id === currentId;
          const isLocked = progress.isOutOfSequence(chapter.id);
          const isHovered = hovered === chapter.id && !isLocked;
          const figure = chapter.isChallenge
            ? t("moduleProgress.quiz")
            : String(chapter.number).padStart(2, "0");

          return (
            <Fragment key={chapter.id}>
              {index > 0 &&
                (isMobile ? (
                  <span style={dotStyle} aria-hidden>
                    ·
                  </span>
                ) : (
                  <span style={linkStyle} aria-hidden />
                ))}
              <button
                type="button"
                aria-current={isCurrent ? "page" : undefined}
                aria-disabled={isLocked || undefined}
                aria-label={isLocked ? `${chapter.label}, ${t("nav.locked")}` : undefined}
                onClick={() => !isCurrent && !isLocked && progress.goTo(chapter.id)}
                onMouseEnter={() => setHovered(chapter.id)}
                onMouseLeave={() => setHovered(null)}
                style={cellStyle(isCurrent, isLocked)}
              >
                {isCurrent ? (
                  <span style={cartoucheStyle}>
                    <span style={figureStyle(true, false, false)}>{figure}</span>
                  </span>
                ) : (
                  <>
                    <span style={figureStyle(false, isLocked, isHovered)}>{figure}</span>
                    {isLocked && <DoodleLock size={lockSize} aria-hidden style={lockStyle} />}
                  </>
                )}
              </button>
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
};
