import type { QuizData } from "../types";
import type { Language } from "../../I18n";

export const getQuizDataM0 = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Mais alors, comment une banque commerciale peut se retrouver à court de M0 ?"
      : "So then, how can a commercial bank end up short of M0?",
    answers: [
      {
        text: fr
          ? "a) La banque commerciale a commis des infractions et la banque centrale lui a ponctionné du M0 en guise de contravention."
          : "a) The commercial bank committed violations and the central bank deducted M0 from it as a fine.",
        isCorrect: false,
        rationale: fr ? (
          <>
            Bien tenté mais non, la Banque Centrale ne peut pas 'ponctionner'
            le M0 comme ça.
          </>
        ) : (
          <>
            Nice try but no, the Central Bank cannot 'deduct' M0 like that.
          </>
        ),
      },
      {
        text: fr
          ? "b) La banque commerciale a créé trop d'argent M2 (pour Nicolas et d'autres) et n'a plus les moyens d'imprimer suffisamment de M0 en proportion."
          : "b) The commercial bank created too much M2 money (for Nicolas and others) and no longer has the means to print enough M0 in proportion.",
        isCorrect: false,
        rationale: fr ? (
          <>
            Rappelez-vous : les banques commerciales créent le M2, mais elles
            ne peuvent jamais fabriquer de M0.
          </>
        ) : (
          <>
            Remember: commercial banks create M2, but they can never
            manufacture M0.
          </>
        ),
      },
      {
        text: fr
          ? "c) La banque commerciale a accordé trop de prêts M2 (dits 'prêts pourris') qui ne sont jamais remboursés."
          : "c) The commercial bank gave too many M2 loans (called 'bad loans') that are never repaid.",
        isCorrect: true,
        rationale: fr ? (
          <>Bien vu, c'est la perte de confiance !</>
        ) : (
          <>Well spotted, it's a loss of confidence!</>
        ),
      },
    ],
  };
};
