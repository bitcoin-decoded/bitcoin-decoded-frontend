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

  const labelStyle: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: withOpacity(colors.base.text.secondary, 0.75),
    marginRight: isMobile ? "0.1rem" : "0.25rem",
  };

  /** A ledger bracket: `[` or `]`, drawn from borders so it can be made thick. */
  const bracketStyle = (side: "left" | "right", thick: boolean): CSSProperties => {
    const weight = thick ? 2 : 1;
    const colour = thick ? moduleAccent : gold;
    const edge = `${weight}px solid ${colour}`;
    return {
      flex: "0 0 auto",
      width: thick ? (isMobile ? 6 : 8) : 4,
      height: thick ? (isMobile ? "1.4rem" : "1.6rem") : isMobile ? "1.05rem" : "1.15rem",
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
    color: isCurrent || isHovered ? gold : withOpacity(gold, 0.72),
    letterSpacing: "0.06em",
    transition: "color 0.2s var(--ease-smooth)",
  });

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
      <span style={bracketStyle("left", true)} aria-hidden />

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
              {isCurrent && <span style={bracketStyle("left", false)} aria-hidden />}
              <span style={numberStyle(isCurrent, isHovered)}>
                {chapter.isChallenge
                  ? t("moduleProgress.quiz")
                  : String(chapter.number).padStart(2, "0")}
              </span>
              {isCurrent && <span style={bracketStyle("right", false)} aria-hidden />}
            </button>
          </Fragment>
        );
      })}

      <span style={bracketStyle("right", true)} aria-hidden />
    </nav>
  );
};
