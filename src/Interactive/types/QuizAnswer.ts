import type { ReactNode } from "react";

export type QuizAnswer = {
  text: string;
  isCorrect: boolean;
  rationale: ReactNode;
};