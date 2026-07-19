import { type CSSProperties, type FC, Fragment, type ReactNode, useState } from "react";

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

import { DoodleCursorClick, DoodleLock } from "@doodle";

/**
 * The module's chapters as one ledger entry — [ 01 — 02 — 03 — QUIZ ] — sitting
 * directly above the block ribbon so the two rails read as a pair: this one
 * moves between chapters, the one below between blocks. Each is prefixed with
 * what it navigates so they cannot be confused.
 *
 * The outer brackets are thick and wear the module's identity colour; the
 * chapters are gold, linked by the same hairline segments the block ribbon uses
 * — the chain motif, one level up. Only the chapter being read is marked, by a
 * lighter bracket of its own. Nothing signals "finished": that is the badge's
 * job, and a second marker here only competed with this one.
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

  const linkWidth = isMobile ? 10 : 18;

  const railStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.3rem 0.45rem" : "0.35rem 0.6rem",
    margin: isMobile ? "0 0 1.25rem" : "0 0 1.5rem",
  };

  // Source Serif 4 rather than the mono: it ships a real 600, so this reads as
  // bold instead of the synthetic smear Cutive would give. Module colour, to
  // match the weight of the brackets it introduces.
  // Icon + word travel together: the cursor says "this row is clickable".
  const labelWrapStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: isMobile ? "0.3rem" : "0.4rem",
    color: moduleAccent,
    marginRight: isMobile ? "0.25rem" : "0.4rem",
  };

  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: typo.micro.fontSize,
    fontWeight: 600,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: moduleAccent,
  };

  // The same hairline the block ribbon links its markers with — the chain motif.
  const linkStyle: CSSProperties = {
    flex: "0 0 auto",
    width: linkWidth,
    height: BRAND.figures.ruleThickness,
    background: withOpacity(gold, 0.5),
  };

  const numberStyle = (
    isCurrent: boolean,
    isHovered: boolean,
    isLocked: boolean,
  ): CSSProperties => ({
    ...typo.figure,
    fontFamily: BRAND.fonts.mono,
    // Only the chapter being read wears the module colour; the others carry the
    // block ribbon's full gold, which is what makes that rail readable at a
    // glance.
    //
    // A locked one steps down only slightly. That deliberately shifts the weight
    // of the state onto the padlock and the dead click: dimming far enough to
    // signal "closed" on its own also dimmed it far enough to have to hunt for
    // the number, and a number you cannot read is not a quieter number, it is a
    // missing one.
    color: isLocked
      ? withOpacity(gold, 0.8)
      : isCurrent
        ? moduleAccent
        : isHovered
          ? gold
          : withOpacity(gold, 0.95),
    letterSpacing: "0.06em",
    transition: "color 0.2s var(--ease-smooth)",
  });

  // Sits at the numeral's bottom-right corner, deliberately left at 12 while the
  // figures moved up a step: the size gap is what makes the padlock read as an
  // annotation on the number rather than as its equal.
  const lockSize = 12;
  const numeralWrapStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
  };
  const lockStyle: CSSProperties = {
    position: "absolute",
    right: -lockSize * 0.6,
    bottom: -lockSize * 0.35,
    color: withOpacity(gold, 0.8),
    pointerEvents: "none",
  };

  // The navbar frames its module numerals with four right-angle corners rather
  // than a box; the current chapter is marked the same way.
  const cornerFrameStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "0.3rem 0.45rem" : "0.35rem 0.55rem",
    // The same wash the navbar puts behind the chapter you are reading.
    background: withOpacity(moduleAccent, 0.1),
  };

  const cornerSize = 5;
  const cornerStroke = `${BRAND.figures.ruleThickness}px solid ${gold}`;
  const corners = (): ReactNode => {
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      pointerEvents: "none",
    };
    return (
      <>
        <span style={{ ...base, top: 0, left: 0, borderTop: cornerStroke, borderLeft: cornerStroke }} />
        <span style={{ ...base, top: 0, right: 0, borderTop: cornerStroke, borderRight: cornerStroke }} />
        <span style={{ ...base, bottom: 0, left: 0, borderBottom: cornerStroke, borderLeft: cornerStroke }} />
        <span style={{ ...base, bottom: 0, right: 0, borderBottom: cornerStroke, borderRight: cornerStroke }} />
      </>
    );
  };

  const cellStyle = (isCurrent: boolean, isLocked: boolean): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: isCurrent ? "0.3rem" : 0,
    padding: 0,
    border: "none",
    borderRadius: 0,
    background: "transparent",
    cursor: isLocked ? "not-allowed" : isCurrent ? "default" : "pointer",
    // Room for the padlock to overhang without colliding with the next link.
    marginRight: isLocked ? lockSize * 0.5 : 0,
  });

  return (
    <nav aria-label={progress.moduleLabel} style={railStyle}>
      <span style={labelWrapStyle}>
        <span style={labelStyle}>{t("moduleProgress.label")}</span>
        <DoodleCursorClick size={isMobile ? 20 : 22} aria-hidden />
      </span>

      {progress.chapters.map((chapter, index) => {
        const isCurrent = chapter.id === currentId;
        const isLocked = progress.isLocked(chapter.id);
        const isHovered = hovered === chapter.id && !isLocked;
        const figure = chapter.isChallenge
          ? t("moduleProgress.quiz")
          : String(chapter.number).padStart(2, "0");

        return (
          <Fragment key={chapter.id}>
            {index > 0 && <span style={linkStyle} aria-hidden />}
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
                <span style={cornerFrameStyle}>
                  {corners()}
                  <span style={numberStyle(true, isHovered, false)}>{figure}</span>
                </span>
              ) : (
                <span style={numeralWrapStyle}>
                  <span style={numberStyle(false, isHovered, isLocked)}>{figure}</span>
                  {isLocked && <DoodleLock size={lockSize} aria-hidden style={lockStyle} />}
                </span>
              )}
            </button>
          </Fragment>
        );
      })}

    </nav>
  );
};
