import { type CSSProperties, type FC } from "react";

import { Caption, FeedbackPanel, getTypography, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useQuiz } from "../hooks";
import { type QuizData } from "../types";

import { CircleCheck, CircleHelp, CircleX } from "@icons";

type QuizProps = QuizData & {
  onCorrectAnswer: () => void;
};

export const Quiz: FC<QuizProps> = ({ onCorrectAnswer, ...data }) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const { selectedIndex, isCorrectlySolved, handleSelect } = useQuiz(data.answers, onCorrectAnswer);

  const accentColor = colors[moduleTheme].border.secondary;
  const success = colors.semantic.success;
  const warning = colors.semantic.warning;

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

  const questionStyle: CSSProperties = {
    color: colors.base.text.primary,
    fontSize: typo.note.fontSize,
    fontStyle: "italic",
    lineHeight: 1.7,
    margin: "0.5rem 0 1.25rem 0",
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
      borderColor = success.border;
      bgColor = success.background;
      textColor = colors.base.text.primary;
    } else if (showResult && !isCorrect) {
      borderColor = warning.border;
      bgColor = warning.background;
      textColor = colors.base.text.primary;
    } else if (isSelected) {
      borderColor = accentColor;
      textColor = colors.base.text.primary;
    }

    return {
      display: "block",
      width: isMobile ? "100%" : `${100 / data.answers.length}%`,
      padding: isMobile ? "0.875rem 1rem" : "1rem",
      borderRadius: 0,
      textAlign: "left",
      cursor: isCorrectlySolved ? "default" : "pointer",
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      color: textColor,
      fontSize: typo.note.fontSize,
      lineHeight: 1.6,
      transition: "all 0.2s var(--ease-smooth)",
      outline: "none",
      opacity: isCorrectlySolved && !isSelected ? 0.4 : 1,
      fontFamily: "inherit",
    };
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
        <FeedbackPanel
          tone={data.answers[selectedIndex].isCorrect ? "success" : "warning"}
          variant="border-left"
          icon={
            data.answers[selectedIndex].isCorrect ? (
              <CircleCheck size={18} strokeWidth={2} color={success.text} />
            ) : (
              <CircleX size={18} strokeWidth={2} color={warning.text} />
            )
          }
          style={{ marginTop: "1.25rem" }}
        >
          {data.answers[selectedIndex].rationale}
        </FeedbackPanel>
      )}
    </SurfaceCard>
  );
};
