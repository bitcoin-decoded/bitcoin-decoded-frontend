import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  Caption,
  FeedbackPanel,
  getBrandGold,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useQuiz } from "../hooks";
import { type QuizData } from "../types";

import { DoodleQuestion, DoodleSmileyGrumpy, DoodleSmileyThumbsUp } from "@doodle";

type QuizProps = QuizData & {
  onCorrectAnswer: () => void;
};

export const Quiz: FC<QuizProps> = ({ onCorrectAnswer, ...data }) => {
  const typo = getTypography();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const { selectedIndex, isCorrectlySolved, hoveredIndex, setHoveredIndex, handleSelect } = useQuiz(
    data.answers,
    onCorrectAnswer,
  );

  const gold = getBrandGold(theme);
  const moduleAccent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;
  const washSource = moduleTheme === "base" ? gold : colors[moduleTheme].background.secondary;
  const success = colors.semantic.success;
  const warning = colors.semantic.warning;

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: isMobile ? "0.75rem" : "1rem",
  };

  const iconStyle: CSSProperties = {
    color: moduleAccent,
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
    alignItems: "stretch",
    gap: isMobile ? "0.6rem" : "0.7rem",
  };

  const cornerSize = 12;
  const corners = (color: string): ReactNode => {
    const s = `${BRAND.figures.ruleThickness}px solid ${color}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      transition: "border-color 0.2s var(--ease-smooth)",
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

  const getOptionVisual = (index: number) => {
    const isSelected = selectedIndex === index;
    const isCorrect = data.answers[index].isCorrect;
    const showResult = isSelected;
    const isHovered = hoveredIndex === index && selectedIndex === null && !isCorrectlySolved;

    let bracket = withOpacity(gold, 0.85);
    let wash = withOpacity(washSource, theme === "dark" ? 0.08 : 0.05);
    let text = colors.base.text.secondary;

    if (showResult && isCorrect) {
      bracket = success.border;
      wash = success.background;
      text = colors.base.text.primary;
    } else if (showResult && !isCorrect) {
      bracket = warning.border;
      wash = warning.background;
      text = colors.base.text.primary;
    } else if (isHovered) {
      bracket = moduleAccent;
      wash = withOpacity(washSource, theme === "dark" ? 0.16 : 0.1);
      text = colors.base.text.primary;
    }

    const style: CSSProperties = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      width: isMobile ? "100%" : `${100 / data.answers.length}%`,
      padding: isMobile ? "1rem 1.1rem" : "1.1rem 1.15rem",
      borderRadius: 0,
      border: "none",
      background: wash,
      color: text,
      textAlign: "center",
      alignItems: "center",
      cursor: isCorrectlySolved ? "default" : "pointer",
      fontSize: typo.note.fontSize,
      lineHeight: 1.6,
      fontFamily: "inherit",
      transition: "all 0.2s var(--ease-smooth)",
      transform: isHovered ? "translateY(-2px)" : "none",
      opacity: isCorrectlySolved && !isSelected ? 0.4 : 1,
    };
    return { style, bracket };
  };

  return (
    <SurfaceCard
      gap={0}
      margin={isMobile ? "1.5rem 0" : "2.5rem 0"}
      style={{ padding: isMobile ? "1rem 1.25rem" : "1.5rem 2rem" }}
    >
      <div style={headerStyle}>
        <div style={iconStyle}>
          <DoodleQuestion size={isMobile ? 24 : 28} />
        </div>
        <div style={{ flex: "1 1 auto" }}>
          <Caption tone="accent" size="md">
            {t("quiz.label")}
          </Caption>
          <p style={questionStyle}>{data.question}</p>
        </div>
      </div>

      <div style={optionsContainerStyle}>
        {data.answers.map((answer, index) => {
          const { style, bracket } = getOptionVisual(index);
          return (
            <button
              key={index}
              style={style}
              onClick={() => handleSelect(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              disabled={isCorrectlySolved}
            >
              {corners(bracket)}
              <span
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: BRAND.fonts.mono,
                  fontSize: isMobile ? "1.5rem" : "1.75rem",
                  fontWeight: 400,
                  lineHeight: 1,
                  color: bracket,
                  marginBottom: "0.65rem",
                  transition: "color 0.2s var(--ease-smooth)",
                }}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span style={{ display: "block" }}>{answer.text}</span>
            </button>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <FeedbackPanel
          tone={data.answers[selectedIndex].isCorrect ? "success" : "warning"}
          variant="border-left"
          icon={
            data.answers[selectedIndex].isCorrect ? (
              <DoodleSmileyThumbsUp size={isMobile ? 34 : 40} style={{ color: success.text }} />
            ) : (
              <DoodleSmileyGrumpy size={isMobile ? 34 : 40} style={{ color: warning.text }} />
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
