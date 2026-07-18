import { type CSSProperties, type FC, useState } from "react";

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
 * The module's chapters as a row of ledger cells — CH01 · CH02 · … — so a
 * reader can move between chapters from the top of the page instead of having
 * to reach the bottom, which previously meant finishing every block first.
 *
 * The current cell is filled in the module accent; finished chapters keep a
 * gold rule under them; the rest are quiet outlines. The end-of-module quiz is
 * marked with a seal rather than a number — it is not a chapter.
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
  const accent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;

  const railStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "0.3rem" : "0.4rem",
    margin: isMobile ? "0 0 1.5rem" : "0 0 1.75rem",
  };

  const cellStyle = (isCurrent: boolean, isDone: boolean, isHovered: boolean): CSSProperties => ({
    ...typo.micro,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: isMobile ? "2.6rem" : "2.9rem",
    padding: isMobile ? "0.3rem 0.4rem" : "0.35rem 0.5rem",
    borderRadius: 0,
    cursor: isCurrent ? "default" : "pointer",
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    background: isCurrent
      ? withOpacity(accent, theme === "dark" ? 0.18 : 0.12)
      : isHovered
        ? withOpacity(accent, theme === "dark" ? 0.1 : 0.06)
        : "transparent",
    border: `1px solid ${
      isCurrent ? withOpacity(accent, 0.7) : withOpacity(colors.base.text.primary, 0.16)
    }`,
    // A finished chapter keeps a gold underline — the ledger's "settled" mark.
    borderBottom: isDone && !isCurrent ? `2px solid ${withOpacity(gold, 0.75)}` : undefined,
    color: isCurrent ? accent : isHovered ? colors.base.text.primary : colors.base.text.secondary,
    transition: "all 0.2s var(--ease-smooth)",
  });

  return (
    <nav aria-label={progress.moduleLabel} style={railStyle}>
      {progress.chapters.map((chapter) => {
        const isCurrent = chapter.id === progress.chapters[progress.currentIndex].id;
        const isDone = progress.isDone(chapter.id);
        const label = chapter.isChallenge
          ? t("moduleProgress.quiz")
          : `${t("moduleProgress.short")}${String(chapter.number).padStart(2, "0")}`;

        return (
          <button
            key={chapter.id}
            type="button"
            title={chapter.label}
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => !isCurrent && progress.goTo(chapter.id)}
            onMouseEnter={() => setHovered(chapter.id)}
            onMouseLeave={() => setHovered(null)}
            style={cellStyle(isCurrent, isDone, hovered === chapter.id)}
          >
            <span style={{ fontFamily: BRAND.fonts.mono }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};
