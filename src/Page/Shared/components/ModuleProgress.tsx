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

  const linkWidth = isMobile ? 0 : 16;

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
    gap: 0,
  };

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
    letterSpacing: isMobile ? "0.02em" : "0.06em",
    transition: "color 0.2s var(--ease-smooth)",
  });

  const lockSize = 12;
  const lockStyle: CSSProperties = {
    position: "absolute",
    right: -lockSize * 0.55,
    bottom: -lockSize * 0.3,
    color: colors.base.text.secondary,
    pointerEvents: "none",
  };

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
      // The padlock overhang is reserved as padding, never margin: as margin
      // it pushed the next link away and punched a hole in the rule.
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
