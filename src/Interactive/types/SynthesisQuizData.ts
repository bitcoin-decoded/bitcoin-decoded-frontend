export type SynthesisQuizAnswer = {
  text: string;
  isCorrect: boolean;
};

export type SynthesisQuizQuestion = {
  question: string;
  chapterRef: string;
  answers: SynthesisQuizAnswer[];
};

export type SynthesisQuizData = {
  questions: SynthesisQuizQuestion[];
  passThreshold: number;
};
