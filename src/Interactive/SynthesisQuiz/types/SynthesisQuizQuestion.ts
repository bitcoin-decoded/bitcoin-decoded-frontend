import type { ChapterReference } from "./ChapterReference";
import type { SynthesisQuizAnswer } from "./SynthesisQuizAnswer";

export type SynthesisQuizQuestion = {
  question: string;
  chapterRefs: ChapterReference[];
  answers: SynthesisQuizAnswer[];
};
