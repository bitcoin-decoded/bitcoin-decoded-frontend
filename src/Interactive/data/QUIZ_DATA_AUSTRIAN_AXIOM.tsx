import type { QuizData } from "../types";
import type { Language } from "../../I18n";

export const getQuizDataAustrianAxiom = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Pouvez-vous réfuter cet axiome ? Essayez de prouver que l'être humain n'agit pas de manière intentionnelle"
      : "Can you refute this axiom? Try to prove that human beings don't act intentionally",
    answers: [
      {
        text: fr
          ? "a) J'ai trouvé ! Je vais rester immobile et ne rien faire."
          : "a) I've got it! I'll stay still and do nothing.",
        isCorrect: false,
        rationale: fr ? (
          <>
            En agissant ainsi, vous agissez dans le but de me prouver que j'ai tort. Votre tentative de réfutation confirme l'axiome !
          </>
        ) : (
          <>
            By doing so, you are acting with the purpose of proving me wrong. Your attempt at refutation confirms the axiom!
          </>
        ),
      },
      {
        text: fr
          ? "b) C'est impossible à réfuter."
          : "b) It's impossible to refute.",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exactement, vous avez compris que toute action humaine est motivée par une intention.
          </>
        ) : (
          <>
            Exactly, you've understood that every human action is driven by intention.
          </>
        ),
      },
    ],
  };
};
