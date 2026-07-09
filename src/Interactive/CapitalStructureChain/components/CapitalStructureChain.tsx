import { type CSSProperties, type FC } from "react";

import { BRAND, ExploredCounter, getTypography, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getSandwichChain } from "../data";
import { useCapitalStructureChain } from "../hooks";

// Tracing the chain back is the pedagogical act, so the block gates on it:
// reveal at least 2 production détours to unlock the rest of the chapter.
const REQUIRED_DETOURS = 2;

type Props = {
  /** Fired once enough détours have been traced back (gates the reading block). */
  onComplete?: () => void;
};

export const CapitalStructureChain: FC<Props> = ({ onComplete }) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const { t, language } = useTranslation();
  const steps = getSandwichChain(language);

  const {
    count,
    exploredDetours,
    isButtonHovered,
    setIsButtonHovered,
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
    gap: "2rem",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: "1rem",
    paddingBottom: "2rem",
  };

  const itemWrapperStyle: CSSProperties = {
    display: "flex",
    animation: "fadeInUp 0.5s ease-out forwards",
  };

  // Sharp ledger card: flat surface, a single module hairline that brightens
  // on hover. No gradient fill, no drop shadow.
  const cardStyle = (index: number): CSSProperties => {
    const isHovered = hoveredCardIndex === index;
    return {
      width: "10rem",
      display: "flex",
      flexDirection: "column",
      background: colors.base.background.secondary,
      borderRadius: 0,
      border: `1px solid ${withOpacity(colors[moduleTheme].border.secondary, isHovered ? 0.55 : 0.3)}`,
      overflow: "visible",
      position: "relative",
      transform: isHovered ? "scale(1.03)" : "scale(1)",
      transition: "transform 0.3s var(--ease-smooth), border-color 0.3s var(--ease-smooth)",
      cursor: "pointer",
      zIndex: isHovered ? 10 : 1,
    };
  };

  const imgBoxStyle: CSSProperties = {
    height: "6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${colors[moduleTheme].border.primary}`,
    backgroundColor: colors[moduleTheme].background.secondary,
  };

  const numberBallStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    background: colors[moduleTheme].background.primary,
    border: `1px solid ${colors[moduleTheme].border.secondary}`,
    margin: "-1rem auto 0 auto",
    zIndex: 2,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.9rem",
    fontWeight: 500,
    lineHeight: 1,
  };

  const contentStyle: CSSProperties = {
    paddingTop: "1.25rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingBottom: "1.25rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    flex: 1,
    fontStyle: "italic",
  };

  const buttonStyle: CSSProperties = {
    alignSelf: "center",
    color: colors.base.text.primary,
    border: `1px solid ${colors[moduleTheme].border.secondary}`,
    borderRadius: 0,
    marginTop: "auto",
    paddingTop: "0.4rem",
    paddingLeft: "0.7rem",
    paddingRight: "0.7rem",
    paddingBottom: "0.4rem",
    cursor: "pointer",
    fontSize: typo.micro.fontSize,
    letterSpacing: "0.05rem",
    lineHeight: 1.6,
    fontWeight: 400,
    backgroundColor: colors[moduleTheme].background.primary,
    filter: isButtonHovered ? "brightness(0.8)" : "brightness(1)",
    transition: "filter 0.2s ease",
  };

  return (
    <>
      <div style={headerRowStyle}>
        <ExploredCounter
          explored={Math.min(exploredDetours, REQUIRED_DETOURS)}
          total={REQUIRED_DETOURS}
          label={t("capitalChain.explored")}
        />
      </div>
      <div style={wrapperStyle}>
        <style>
          {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
        </style>
        {steps.slice(0, count).map((step, index) => {
          const isLast = index === count - 1;
          const hasNext = count < steps.length;

          return (
            <div key={step.id} style={itemWrapperStyle}>
              <div
                style={cardStyle(index)}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <div style={imgBoxStyle}>{step.image}</div>
                <div style={numberBallStyle}>{step.id}</div>
                <div style={contentStyle}>
                  <strong
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontSize: typo.note.fontSize,
                      color: colors.base.text.primary,
                      fontStyle: "normal",
                      letterSpacing: "0.08em",
                      fontWeight: 500,
                      fontVariant: "small-caps",
                    }}
                  >
                    {step.title}
                  </strong>
                  <div
                    style={{
                      color: colors.base.text.secondary,
                      lineHeight: 1.3,
                      fontSize: "0.8rem",
                    }}
                  >
                    {step.text}
                  </div>
                  {isLast && hasNext && (
                    <button
                      style={buttonStyle}
                      onClick={handleButtonClick}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                    >
                      {t("capitalChain.traceBack")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
