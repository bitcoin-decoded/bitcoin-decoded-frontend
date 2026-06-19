import { useCallback, useEffect, useMemo, useState } from "react";

import type { SynthesisQuizQuestion } from "../types/";

type Options = {
  questions: SynthesisQuizQuestion[];
  passThreshold: number;
  storageKey: string;
  onPass?: () => void;
};

type PersistedState = {
  selections: (number | null)[];
  submitted: boolean;
};

const readPersistedState = (key: string, expectedLength: number): PersistedState | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (
      !Array.isArray(parsed.selections) ||
      parsed.selections.length !== expectedLength ||
      typeof parsed.submitted !== "boolean"
    ) {
      return null;
    }
    return {
      selections: parsed.selections.map((v) => (typeof v === "number" ? v : null)),
      submitted: parsed.submitted,
    };
  } catch {
    return null;
  }
};

export const useSynthesisQuiz = ({ questions, passThreshold, storageKey, onPass }: Options) => {
  const defaultSelections = useMemo(() => questions.map(() => null), [questions]);

  const [selections, setSelections] = useState<(number | null)[]>(
    () => readPersistedState(storageKey, questions.length)?.selections ?? defaultSelections,
  );
  const [submitted, setSubmitted] = useState<boolean>(
    () => readPersistedState(storageKey, questions.length)?.submitted ?? false,
  );

  // One-question-at-a-time stepper (à la PathFinder). Not persisted: a re-open
  // restarts at the first question, or lands straight on the recap if the quiz
  // was already submitted.
  const [step, setStep] = useState(0);
  const lastStep = questions.length - 1;

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ selections, submitted }));
    } catch {
      // storage full or unavailable - silently ignore
    }
  }, [storageKey, selections, submitted]);

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
    // Answering the current question slides to the next one (stays on the last).
    setStep((s) => (qIdx === s && s < lastStep ? s + 1 : s));
  };

  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const next = useCallback(() => setStep((s) => Math.min(lastStep, s + 1)), [lastStep]);
  const goTo = useCallback(
    (i: number) => setStep(() => Math.max(0, Math.min(lastStep, i))),
    [lastStep],
  );

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelections(defaultSelections);
    setSubmitted(false);
    setStep(0);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  };

  return {
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
  };
};
