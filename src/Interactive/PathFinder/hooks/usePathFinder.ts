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

export const usePathFinder = () => {
  const { language } = useTranslation();
  const copy = useMemo(() => getPathFinderCopy(language), [language]);
  const [answers, setAnswers] = useState<PathAnswers>(EMPTY_ANSWERS);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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
