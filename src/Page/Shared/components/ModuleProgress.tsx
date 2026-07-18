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
  const labelStyle: CSSProperties = {
    fontFamily: BRAND.fonts.body,
    fontSize: typo.micro.fontSize,
    fontWeight: 600,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: moduleAccent,
    marginRight: isMobile ? "0.25rem" : "0.4rem",
  };

  /** The entry brackets: thick, in the module colour, drawn from borders since
   *  Cutive has one weight and a typed "[" could not be made heavy. */
  const bracketStyle = (side: "left" | "right"): CSSProperties => {
    const edge = `2px solid ${moduleAccent}`;
    return {
      flex: "0 0 auto",
      width: isMobile ? 6 : 8,
      height: isMobile ? "1.4rem" : "1.6rem",
      borderTop: edge,
      borderBottom: edge,
      ...(side === "left" ? { borderLeft: edge } : { borderRight: edge }),
    };
  };

  // The same hairline the block ribbon links its markers with — the chain motif.
  const linkStyle: CSSProperties = {
    flex: "0 0 auto",
    width: linkWidth,
    height: BRAND.figures.ruleThickness,
    background: withOpacity(gold, 0.5),
  };

  const numberStyle = (isCurrent: boolean, isHovered: boolean): CSSProperties => ({
    ...typo.micro,
    fontFamily: BRAND.fonts.mono,
    // Only the chapter being read wears the module colour; the others are gold.
    color: isCurrent ? moduleAccent : isHovered ? gold : withOpacity(gold, 0.72),
    letterSpacing: "0.06em",
    transition: "color 0.2s var(--ease-smooth)",
  });

  // The navbar frames its module numerals with four right-angle corners rather
  // than a box; the current chapter is marked the same way.
  const cornerFrameStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "0.3rem 0.45rem" : "0.35rem 0.55rem",
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

  const cellStyle = (isCurrent: boolean): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: isCurrent ? "0.3rem" : 0,
    padding: 0,
    border: "none",
    borderRadius: 0,
    background: "transparent",
    cursor: isCurrent ? "default" : "pointer",
  });

  return (
    <nav aria-label={progress.moduleLabel} style={railStyle}>
      <span style={labelStyle}>{t("moduleProgress.label")}</span>
      <span style={bracketStyle("left")} aria-hidden />

      {progress.chapters.map((chapter, index) => {
        const isCurrent = chapter.id === currentId;
        const isHovered = hovered === chapter.id;

        return (
          <Fragment key={chapter.id}>
            {index > 0 && <span style={linkStyle} aria-hidden />}
            <button
              type="button"
              title={chapter.label}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => !isCurrent && progress.goTo(chapter.id)}
              onMouseEnter={() => setHovered(chapter.id)}
              onMouseLeave={() => setHovered(null)}
              style={cellStyle(isCurrent)}
            >
              {isCurrent ? (
                <span style={cornerFrameStyle}>
                  {corners()}
                  <span style={numberStyle(true, isHovered)}>
                    {chapter.isChallenge
                      ? t("moduleProgress.quiz")
                      : String(chapter.number).padStart(2, "0")}
                  </span>
                </span>
              ) : (
                <span style={numberStyle(false, isHovered)}>
                  {chapter.isChallenge
                    ? t("moduleProgress.quiz")
                    : String(chapter.number).padStart(2, "0")}
                </span>
              )}
            </button>
          </Fragment>
        );
      })}

      <span style={bracketStyle("right")} aria-hidden />
    </nav>
  );
};
