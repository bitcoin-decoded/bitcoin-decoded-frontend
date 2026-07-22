import { type CSSProperties, type FC } from "react";

import { BRAND, Button, Caption, FeedbackPanel, getTypography, OptionButton, SurfaceCard, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { useSynthesisQuiz } from "../hooks";
import type { SynthesisQuizData } from "../types";

import { DoodleQuestion } from "@doodle";
import { ArrowLeft, ArrowRight, Check, CircleCheck, CircleX, RotateCcw } from "@icons";

type Props = SynthesisQuizData & {
  storageKey: string;
  onPass?: () => void;
  onReset?: () => void;
};

export const SynthesisQuiz: FC<Props> = ({
  questions,
  passThreshold,
  storageKey,
  onPass,
  onReset,
}) => {
  const typo = getTypography();
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";
  const world = colors[moduleTheme];
  const accent = world.text.secondary;
  const {
    selections,
    submitted,
    allAnswered,
    score,
    passed,
    step,
    lastStep,
    back,
    next,
    goTo,
    handleSelect,
    handleSubmit,
    handleReset,
  } = useSynthesisQuiz({ questions, passThreshold, storageKey, onPass });

  const onRetryClick = () => {
    handleReset();
    onReset?.();
  };

  const current = questions[step];
  const answeredCount = selections.filter((s) => s !== null).length;

  const stepperHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.5rem",
  };

  const dotsStyle: CSSProperties = {
    display: "flex",
    flex: "1 1 auto",
    minWidth: 0,
    gap: "0.4rem",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const dotStyle = (i: number): CSSProperties => ({
    width: i === step ? "0.75rem" : "0.5rem",
    height: "0.5rem",
    borderRadius: "999px",
    border: "none",
    padding: 0,
    cursor: "pointer",
    background:
      i === step || selections[i] !== null ? accent : withOpacity(colors.base.text.secondary, 0.22),
    transition: "all 0.25s var(--ease-smooth)",
  });

  const questionFadeStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    animation: "donationFade 0.22s var(--ease-smooth)",
  };

  const indexStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize: typo.micro.fontSize,
    fontVariant: "small-caps",
    color: accent,
    letterSpacing: "0.08em",
  };

  const questionTitleStyle: CSSProperties = {
    ...typo.prose,
    color: colors.base.text.primary,
    fontWeight: 500,
    margin: 0,
  };

  const scoreColor = passed ? colors.semantic.success.text : colors.semantic.error.text;
  const headlineKey = passed ? "synthesisQuiz.passed" : "synthesisQuiz.failed";

  return (
    <SurfaceCard
      gap={isMobile ? "1.25rem" : "1.5rem"}
      margin={isMobile ? "1.5rem 0" : "2.5rem 0"}
      style={{ padding: isMobile ? "1rem 1.15rem" : "1.5rem 2rem" }}
    >
      <Caption icon={<DoodleQuestion size={isMobile ? 20 : 22} />} tone="accent" size="md">
        {t("synthesisQuiz.label")}
      </Caption>

      {!submitted && (
        <>
          <div style={stepperHeaderStyle}>
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft size={14} strokeWidth={2.2} />}
              onClick={back}
              disabled={step === 0}
              style={{ paddingLeft: 0 }}
            >
              {t("synthesisQuiz.back")}
            </Button>
            <div style={dotsStyle}>
              {questions.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  style={dotStyle(i)}
                  onClick={() => goTo(i)}
                  aria-label={`${t("synthesisQuiz.question")} ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowRight size={14} strokeWidth={2.2} />}
              iconPosition="right"
              onClick={next}
              disabled={step === lastStep}
              style={{ paddingRight: 0 }}
            >
              {t("synthesisQuiz.next")}
            </Button>
          </div>

          <div key={step} style={questionFadeStyle}>
            <span style={indexStyle}>
              {t("synthesisQuiz.question")} {step + 1} / {questions.length}
            </span>
            <p style={questionTitleStyle}>{current.question}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {current.answers.map((answer, aIdx) => (
                <OptionButton
                  key={aIdx}
                  index={aIdx}
                  label={answer.text}
                  selected={selections[step] === aIdx}
                  accent={accent}
                  onClick={() => handleSelect(step, aIdx)}
                />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              fullWidth={isMobile}
              icon={<Check size={14} strokeWidth={2.4} />}
            >
              {allAnswered
                ? t("synthesisQuiz.submit")
                : `${t("synthesisQuiz.answerAll")} (${answeredCount}/${questions.length})`}
            </Button>
          </div>
        </>
      )}

      {submitted && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <FeedbackPanel
            tone={passed ? "success" : "error"}
            title={
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                {passed ? (
                  <CircleCheck size={16} strokeWidth={2} color={colors.semantic.success.text} />
                ) : (
                  <CircleX size={16} strokeWidth={2} color={colors.semantic.error.text} />
                )}
                {t(headlineKey)}
              </span>
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "0.2rem 0.6rem",
              }}
            >
              <span style={{ ...typo.heading, color: scoreColor }}>
                {score} / {questions.length}
              </span>
              <span style={{ ...typo.micro, color: colors.base.text.secondary }}>
                {t("synthesisQuiz.threshold")} {passThreshold}/{questions.length}
              </span>
            </div>
          </FeedbackPanel>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="secondary"
              onClick={onRetryClick}
              icon={<RotateCcw size={isMobile ? 12 : 14} strokeWidth={2} />}
            >
              {t("synthesisQuiz.retry")}
            </Button>
          </div>
        </div>
      )}
    </SurfaceCard>
  );
};
