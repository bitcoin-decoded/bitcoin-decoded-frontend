import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataAustrianAxiom = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Peux-tu réfuter cet axiome ? Essaie de prouver que l'être humain n'agit pas de manière intentionnelle."
      : "Can you refute this axiom? Try to prove that human beings don't act with intention.",
    answers: [
      {
        text: fr
          ? "J'ai trouvé ! Je vais rester immobile et ne rien faire."
          : "Got it! I'll stay still and do nothing.",
        isCorrect: false,
        rationale: fr ? (
          <>
            En agissant ainsi, tu agis dans le but de me prouver que j'ai tort. Ta tentative de
            réfutation confirme l'axiome !
          </>
        ) : (
          <>
            By doing that, you're acting with the goal of proving me wrong. Your attempt at
            refutation confirms the axiom!
          </>
        ),
      },
      {
        text: fr ? "C'est impossible à réfuter." : "It's impossible to refute.",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exactement. Tu as compris : au sens praxéologique, une action est un comportement
            orienté vers un but (et non, je te vois venir : un réflexe, lui, n'est pas une action
            !).
          </>
        ) : (
          <>
            Exactly. You got it: in the praxeological sense, an action is behavior aimed at a goal
            (and no, I see you coming: a reflex doesn't count as an action!).
          </>
        ),
      },
    ],
  };
};
