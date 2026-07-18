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

import { DoodleStamp } from "@doodle";

/**
 * The module's chapters as a single quiet line — CHAPITRE 01 02 03 … ⌗ — sat
 * just under the navbar so a reader can move between chapters without first
 * reaching the foot of the page (which, on block-reading chapters, meant
 * revealing every block).
 *
 * Deliberately not a row of boxes: it echoes the page's own eyebrow
 * (`SectionLabel`) — the word in structural gold, then bare numerals. The
 * current chapter is the only filled cell, so "where am I" is unmistakable;
 * finished ones keep the gold, the rest recede into quiet ink. The
 * end-of-module quiz carries the navbar's stamp rather than a number, because
 * it is not a chapter.
 */
export const ModuleProgress: FC = () => {
  const progress = useModuleProgress();
  const { colors } = usePageTheme();
  const { theme } = useThemeContext();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<RouteName | null>(null);

  if (!progress || progress.chapters.length < 2) return null;

  const gold = getBrandGold(theme);
  const currentId = progress.chapters[progress.currentIndex].id;

  const railStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "center",
    gap: isMobile ? "0.15rem 0.4rem" : "0.2rem 0.55rem",
    margin: isMobile ? "0 0 1.75rem" : "0 0 2rem",
  };

  // The same register as the chapter eyebrow: mono, tracked, structural gold.
  const wordStyle: CSSProperties = {
    ...typo.kicker,
    color: gold,
    marginRight: isMobile ? "0.15rem" : "0.35rem",
  };

  const cellStyle = (isCurrent: boolean, isDone: boolean, isHovered: boolean): CSSProperties => {
    const ink = isCurrent
      ? colors.base.text.primary
      : isDone
        ? withOpacity(gold, 0.95)
        : withOpacity(colors.base.text.secondary, isHovered ? 0.95 : 0.55);

    return {
      ...typo.kicker,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.3rem",
      padding: isMobile ? "0.15rem 0.35rem" : "0.2rem 0.45rem",
      border: "none",
      borderRadius: 0,
      // Only the current chapter is filled — that is the whole "you are here".
      background: isCurrent ? withOpacity(gold, theme === "dark" ? 0.22 : 0.16) : "transparent",
      color: ink,
      cursor: isCurrent ? "default" : "pointer",
      transition: "color 0.2s var(--ease-smooth), background 0.2s var(--ease-smooth)",
    };
  };

  const separatorStyle: CSSProperties = {
    ...typo.kicker,
    color: withOpacity(colors.base.text.secondary, 0.3),
  };

  return (
    <nav aria-label={progress.moduleLabel} style={railStyle}>
      <span style={wordStyle}>{t("moduleProgress.word")}</span>

      {progress.chapters.map((chapter, index) => {
        const isCurrent = chapter.id === currentId;
        const isDone = progress.isDone(chapter.id);

        return (
          <Fragment key={chapter.id}>
            {index > 0 && (
              <span style={separatorStyle} aria-hidden>
                ·
              </span>
            )}
            <button
              type="button"
              title={chapter.label}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => !isCurrent && progress.goTo(chapter.id)}
              onMouseEnter={() => setHovered(chapter.id)}
              onMouseLeave={() => setHovered(null)}
              style={cellStyle(isCurrent, isDone, hovered === chapter.id)}
            >
              {chapter.isChallenge ? (
                <DoodleStamp size={isMobile ? 17 : 19} />
              ) : (
                <span style={{ fontFamily: BRAND.fonts.mono }}>
                  {String(chapter.number).padStart(2, "0")}
                </span>
              )}
            </button>
          </Fragment>
        );
      })}
    </nav>
  );
};
