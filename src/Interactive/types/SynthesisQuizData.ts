import type { TranslationKey } from "../../I18n";
import type { RouteName } from "../../Routing";

export type SynthesisQuizAnswer = {
  text: string;
  isCorrect: boolean;
};

export type ChapterReference = {
  routeId: RouteName;
  labelKey: TranslationKey;
};

export type SynthesisQuizQuestion = {
  question: string;
  chapterRefs: ChapterReference[];
  answers: SynthesisQuizAnswer[];
};

export type SynthesisQuizData = {
  questions: SynthesisQuizQuestion[];
  passThreshold: number;
};
