import { useEffect, useMemo, useState } from "react";

import type { SynthesisQuizQuestion } from "../types/SynthesisQuizData";

type Options = {
  questions: SynthesisQuizQuestion[];
  passThreshold: number;
  onPass?: () => void;
};

export const useSynthesisQuiz = ({ questions, passThreshold, onPass }: Options) => {
  const [selections, setSelections] = useState<(number | null)[]>(
    () => questions.map(() => null),
  );
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = selections.every((s) => s !== null);

  const score = useMemo(
    () =>
      selections.reduce<number>(
        (acc, sel, qIdx) =>
          sel !== null && questions[qIdx].answers[sel].isCorrect ? acc + 1 : acc,
        0,
      ),
    [selections, questions],
  );

  const passed = submitted && score >= passThreshold;

  useEffect(() => {
    if (passed) onPass?.();
  }, [passed, onPass]);

  const handleSelect = (qIdx: number, aIdx: number) => {
    if (submitted) return;
    setSelections((prev) => {
      const next = [...prev];
      next[qIdx] = aIdx;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelections(questions.map(() => null));
    setSubmitted(false);
  };

  return {
    selections,
    submitted,
    allAnswered,
    score,
    passed,
    handleSelect,
    handleSubmit,
    handleReset,
  };
};
