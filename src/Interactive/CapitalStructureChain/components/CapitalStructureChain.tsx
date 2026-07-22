import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  Button,
  ExploredCounter,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { getSandwichChain } from "../data";
import { useCapitalStructureChain } from "../hooks";

import { DoodleHourglass } from "@doodle";

const REQUIRED_DETOURS = 2;

type Props = {
  onComplete?: () => void;
};

export const CapitalStructureChain: FC<Props> = ({ onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const { t, language } = useTranslation();
  const steps = getSandwichChain(language);

  const gold = getBrandGold(theme);
  const accent = colors[moduleTheme].text.secondary;

  const {
    count,
    exploredDetours,
    hoveredCardIndex,
    setHoveredCardIndex,
    handleButtonClick,
  } = useCapitalStructureChain(steps.length, { requiredDetours: REQUIRED_DETOURS, onComplete });

  const headerRowStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: "1rem",
  };

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: isMobile ? "1.25rem" : "1.75rem",
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
    paddingTop: "1rem",
    paddingBottom: "2rem",
  };

  const itemWrapperStyle: CSSProperties = {
    display: "flex",
    flex: isMobile ? "1 1 calc(50% - 0.625rem)" : "0 0 auto",
    minWidth: 0,
    maxWidth: isMobile ? "calc(50% - 0.625rem)" : "none",
    animation: "chainStepIn 0.35s var(--ease-smooth) both",
  };

  const cornerSize = 10;
  const corners = (color: string): ReactNode => {
    const s = `${BRAND.figures.ruleThickness}px solid ${color}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      transition: "border-color 0.25s var(--ease-smooth)",
      pointerEvents: "none",
    };
    return (
      <>
        <span style={{ ...base, top: 0, left: 0, borderTop: s, borderLeft: s }} />
        <span style={{ ...base, top: 0, right: 0, borderTop: s, borderRight: s }} />
        <span style={{ ...base, bottom: 0, left: 0, borderBottom: s, borderLeft: s }} />
        <span style={{ ...base, bottom: 0, right: 0, borderBottom: s, borderRight: s }} />
      </>
    );
  };

  const cardStyle = (index: number): CSSProperties => {
    const isHovered = hoveredCardIndex === index;
    return {
      width: isMobile ? "100%" : "10.5rem",
      display: "flex",
      flexDirection: "column",
      background: colors.base.background.secondary,
      borderRadius: 0,
      border: "none",
      position: "relative",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      transition: "transform 0.25s var(--ease-smooth)",
      cursor: "default",
    };
  };

  const iconBoxStyle: CSSProperties = {
    height: isMobile ? "4.5rem" : "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: withOpacity(accent, theme === "dark" ? 0.1 : 0.06),
    borderBottom: `1px solid ${withOpacity(gold, 0.25)}`,
    color: accent,
  };

  const numberCellStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "1.6rem",
    height: "1.6rem",
    padding: "0 0.3rem",
    borderRadius: 0,
    background: colors.base.background.secondary,
    border: `1px solid ${withOpacity(gold, 0.45)}`,
    margin: "-0.8rem auto 0 auto",
    position: "relative",
    zIndex: 2,
    ...typo.micro,
    color: accent,
    lineHeight: 1,
  };

  const contentStyle: CSSProperties = {
    padding: isMobile ? "0.9rem 0.7rem 1rem" : "1rem 0.75rem 1.15rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.4rem",
    flex: 1,
  };

  const titleStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.label.fontSize,
    fontVariant: "small-caps",
    letterSpacing: "0.08em",
    color: colors.base.text.primary,
  };

  const textStyle: CSSProperties = {
    ...typo.note,
    color: colors.base.text.secondary,
    fontStyle: "italic",
  };

  return (
    <FrText>
      <>
        <div style={headerRowStyle}>
          <ExploredCounter
            explored={Math.min(exploredDetours, REQUIRED_DETOURS)}
            total={REQUIRED_DETOURS}
            label={t("capitalChain.explored")}
          />
        </div>
        <div style={wrapperStyle}>
          {steps.slice(0, count).map((step, index) => {
            const isLast = index === count - 1;
            const hasNext = count < steps.length;
            const isHovered = hoveredCardIndex === index;
            const Icon = step.icon;

            return (
              <div key={step.id} style={itemWrapperStyle}>
                <div
                  style={cardStyle(index)}
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  {corners(withOpacity(gold, isHovered ? 0.85 : 0.5))}
                  <div style={iconBoxStyle}>
                    <Icon size={isMobile ? 30 : 36} />
                  </div>
                  <div style={numberCellStyle}>{step.id}</div>
                  <div style={contentStyle}>
                    <span style={titleStyle}>{step.title}</span>
                    <span style={textStyle}>{step.text}</span>
                    {isLast && hasNext && (
                      <Button
                        variant="primary"
                        size="sm"
                        color={accent}
                        hideBrackets
                        icon={<DoodleHourglass size={isMobile ? 22 : 26} />}
                        onClick={handleButtonClick}
                        style={{ marginTop: "auto" }}
                      >
                        {t("capitalChain.traceBack")}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </FrText>
  );
};
