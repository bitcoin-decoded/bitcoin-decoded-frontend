import type { SynthesisQuizQuestion } from "./SynthesisQuizQuestion";

export type SynthesisQuizData = {
  questions: SynthesisQuizQuestion[];
  passThreshold: number;
};
