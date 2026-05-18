import { type CSSProperties, type FC } from "react";

import { usePageTheme } from "../../../Design";
import { SANDWICH_CHAIN } from "../data";
import { useCapitalStructureChain } from "../hooks";

export const CapitalStructureChain: FC = () => {
  const { colors, moduleTheme } = usePageTheme();

  const {
    count,
    isButtonHovered,
    setIsButtonHovered,
    hoveredCardIndex,
    setHoveredCardIndex,
    handleButtonClick,
  } = useCapitalStructureChain(SANDWICH_CHAIN.length);

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  };

  const itemWrapperStyle: CSSProperties = {
    display: "flex",
    animation: "fadeInUp 0.5s ease-out forwards",
  };

  const cardStyle = (index: number): CSSProperties => {
    const isHovered = hoveredCardIndex === index;
    return {
      width: "10rem",
      display: "flex",
      flexDirection: "column",
      background: `linear-gradient(190deg, ${colors[moduleTheme].background.primary}, ${colors.base.background.primary})`,
      borderRadius: "1rem",
      overflow: "visible",
      position: "relative",
      transform: isHovered ? "scale(1.03)" : "scale(1)",
      boxShadow: isHovered ? colors.boxShadow.strong : colors.boxShadow.soft,
      transition: "transform 0.3s var(--ease-smooth), box-shadow 0.3s var(--ease-smooth)",
      cursor: "pointer",
      zIndex: isHovered ? 10 : 1,
    };
  };

  const imgBoxStyle: CSSProperties = {
    height: "6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
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
    fontSize: "1rem",
    fontWeight: "bold",
    lineHeight: 1,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
    borderRadius: "0.25rem",
    marginTop: "auto",
    paddingTop: "0.4rem",
    paddingLeft: "0.7rem",
    paddingRight: "0.7rem",
    paddingBottom: "0.4rem",
    cursor: "pointer",
    fontSize: "0.7rem",
    letterSpacing: "0.05rem",
    lineHeight: 1.6,
    fontWeight: 400,
    backgroundColor: colors[moduleTheme].background.primary,
    filter: isButtonHovered ? "brightness(0.8)" : "brightness(1)",
    transition: "filter 0.2s ease",
  };

  return (
    <div style={wrapperStyle}>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      {SANDWICH_CHAIN.slice(0, count).map((step, index) => {
        const isLast = index === count - 1;
        const hasNext = count < SANDWICH_CHAIN.length;

        return (
          <div key={step.id} style={itemWrapperStyle}>
            <div
              className="gradient-border"
              style={
                {
                  ...cardStyle(index),
                  "--border-glow-color":
                    hoveredCardIndex === index
                      ? colors[moduleTheme].text.secondary
                      : colors[moduleTheme].border.secondary,
                } as CSSProperties
              }
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
                    fontSize: "0.85rem",
                    color: colors.base.text.primary,
                    fontStyle: "normal",
                    letterSpacing: "0.1em",
                    fontWeight: 400,
                    textTransform: "uppercase",
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
                    REMONTER LE TEMPS ⌛ →
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
