import { useCallback, useMemo, useState } from "react";

import { useTranslation } from "../../../I18n";
import { getPathFinderCopy, getProfiles } from "../data";
import { buildProfileResult } from "../helpers";
import type { PathAnswers } from "../types";

const EMPTY_ANSWERS: PathAnswers = {
  capital: null,
  frequency: null,
  custody: null,
  privacy: null,
};

const LAST_STEP = 3;

/**
 * Owns the wizard state: a one-question-at-a-time stepper, the answers, and a
 * `submitted` flag that gates the result cards. Answering advances to the next
 * question; the reader can step back to the very first one.
 */
export const usePathFinder = () => {
  const { language } = useTranslation();
  const copy = useMemo(() => getPathFinderCopy(language), [language]);
  const [answers, setAnswers] = useState<PathAnswers>(EMPTY_ANSWERS);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  /** Record an answer and advance to the next question (stays put on the last). */
  const answer = useCallback(<K extends keyof PathAnswers>(key: K, value: PathAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => (s < LAST_STEP ? s + 1 : s));
  }, []);

  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const submit = useCallback(() => setSubmitted(true), []);

  const reset = useCallback(() => {
    setAnswers(EMPTY_ANSWERS);
    setStep(0);
    setSubmitted(false);
  }, []);

  const allAnswered = Object.values(answers).every((v) => v !== null);

  const profiles = useMemo(() => getProfiles(language), [language]);
  const result = useMemo(
    () => buildProfileResult(answers, copy, profiles),
    [answers, copy, profiles],
  );

  return {
    copy,
    answers,
    step,
    lastStep: LAST_STEP,
    submitted,
    allAnswered,
    result,
    answer,
    back,
    submit,
    reset,
  };
};
