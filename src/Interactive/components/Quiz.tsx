import { type CSSProperties, type FC } from "react";

import { CircleCheck, CircleHelp, CircleX } from "lucide-react";

import { Caption, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../Design";
import { useTranslation } from "../../I18n";
import { useQuiz } from "../hooks";
import { type QuizData } from "../types";

type QuizProps = QuizData & {
  onCorrectAnswer: () => void;
};

export const Quiz: FC<QuizProps> = ({ onCorrectAnswer, ...data }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const { selectedIndex, isCorrectlySolved, handleSelect } = useQuiz(data.answers, onCorrectAnswer);

  const accentColor = colors[moduleTheme].border.secondary;

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: isMobile ? "0.75rem" : "1rem",
  };

  const iconStyle: CSSProperties = {
    color: accentColor,
    flexShrink: 0,
    marginTop: "0.125rem",
  };

  const separatorStyle: CSSProperties = {
    width: "100%",
    height: "1px",
    background: `linear-gradient(to right, ${withOpacity(accentColor, 0.25)}, transparent)`,
    border: "none",
    margin: isMobile ? "0.625rem 0" : "0.75rem 0",
  };

  const questionStyle: CSSProperties = {
    color: colors.base.text.secondary,
    fontSize: isMobile ? "0.875rem" : "0.9375rem",
    fontStyle: "italic",
    lineHeight: 1.7,
    margin: "0 0 1.25rem 0",
  };

  const optionsContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "0.625rem",
  };

  const getOptionStyle = (index: number): CSSProperties => {
    const isSelected = selectedIndex === index;
    const isCorrect = data.answers[index].isCorrect;
    const showResult = isSelected && selectedIndex !== null;

    let borderColor = withOpacity(accentColor, 0.3);
    let bgColor = colors.base.background.primary;
    let textColor = colors.base.text.secondary;

    if (showResult && isCorrect) {
      borderColor = "#10B981";
      bgColor = "rgba(16, 185, 129, 0.08)";
      textColor = colors.base.text.primary;
    } else if (showResult && !isCorrect) {
      borderColor = "#F97316";
      bgColor = "rgba(249, 115, 22, 0.08)";
      textColor = colors.base.text.primary;
    } else if (isSelected) {
      borderColor = accentColor;
      textColor = colors.base.text.primary;
    }

    return {
      display: "block",
      width: isMobile ? "100%" : `${100 / data.answers.length}%`,
      padding: isMobile ? "0.875rem 1rem" : "1rem",
      borderRadius: "0.75rem",
      textAlign: "left",
      cursor: isCorrectlySolved ? "default" : "pointer",
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      color: textColor,
      fontSize: isMobile ? "0.8125rem" : "0.875rem",
      lineHeight: 1.6,
      transition: "all 0.2s var(--ease-smooth)",
      outline: "none",
      opacity: isCorrectlySolved && !isSelected ? 0.4 : 1,
      fontFamily: "inherit",
    };
  };

  const getRationaleStyle = (): CSSProperties => {
    if (selectedIndex === null) return {};
    const isCorrect = data.answers[selectedIndex].isCorrect;
    const feedbackColor = isCorrect ? "#10B981" : "#F97316";

    return {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.75rem",
      marginTop: "1.25rem",
      padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
      borderRadius: "0.75rem",
      backgroundColor: isCorrect ? "rgba(16, 185, 129, 0.06)" : "rgba(249, 115, 22, 0.06)",
      borderLeft: `3px solid ${feedbackColor}`,
      color: colors.base.text.secondary,
      fontSize: isMobile ? "0.8125rem" : "0.875rem",
      lineHeight: 1.7,
    };
  };

  const feedbackIconStyle: CSSProperties = {
    flexShrink: 0,
    marginTop: "0.125rem",
  };

  return (
    <SurfaceCard
      gap={0}
      margin={isMobile ? "1.5rem 0" : "2.5rem 0"}
      style={{ padding: isMobile ? "1rem 1.25rem" : "1.5rem 2rem" }}
    >
      <div style={headerStyle}>
        <div style={iconStyle}>
          <CircleHelp size={isMobile ? 18 : 20} strokeWidth={2} />
        </div>
        <div style={{ flex: "1 1 auto" }}>
          <Caption tone="accent" size="md">
            {t("quiz.label")}
          </Caption>
          <hr style={separatorStyle} />
          <p style={questionStyle}>{data.question}</p>
        </div>
      </div>

      <div style={optionsContainerStyle}>
        {data.answers.map((answer, index) => (
          <button
            key={index}
            style={getOptionStyle(index)}
            onClick={() => handleSelect(index)}
            disabled={isCorrectlySolved}
          >
            {answer.text}
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div style={getRationaleStyle()}>
          <div style={feedbackIconStyle}>
            {data.answers[selectedIndex].isCorrect ? (
              <CircleCheck size={18} strokeWidth={2} color="#10B981" />
            ) : (
              <CircleX size={18} strokeWidth={2} color="#F97316" />
            )}
          </div>
          <div>{data.answers[selectedIndex].rationale}</div>
        </div>
      )}
    </SurfaceCard>
  );
};
