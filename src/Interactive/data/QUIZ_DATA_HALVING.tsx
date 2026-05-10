import type { Language } from "../../I18n";
import type { QuizData } from "../types";

export const getQuizDataHalving = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Après un halving, qu'est-ce qui maintient l'équilibre du réseau ?"
      : "After a halving, what maintains the network's equilibrium?",
    answers: [
      {
        text: fr
          ? "a) L'ajustement automatique de la difficulté et la concurrence entre les mineurs"
          : "a) Automatic difficulty adjustment and competition among miners",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exactement. Souviens-toi : le système ajuste dynamiquement sa cible de difficulté. Après
            un halving, si la rentabilité baisse et que certains mineurs quittent le réseau, la
            difficulté finit par s'ajuster à la baisse, ce qui rétablit progressivement l'équilibre
            économique et incite de nouveaux mineurs à entrer dans la partie.
          </>
        ) : (
          <>
            Exactly. Remember: the system dynamically adjusts its difficulty target. After a
            halving, if profitability drops and some miners leave the network, the difficulty
            eventually adjusts downward, progressively restoring economic balance and incentivizing
            new miners to join.
          </>
        ),
      },
      {
        text: fr ? "b) La hausse du prix du bitcoin" : "b) A rise in the price of bitcoin",
        isCorrect: false,
        rationale: fr ? (
          <>
            Partiellement vrai à court terme mais insuffisant à long terme : le prix seul ne
            garantit pas la structure de sécurité du réseau.
          </>
        ) : (
          <>
            Partially true in the short term but insufficient in the long run: the price alone does
            not guarantee the network's security structure.
          </>
        ),
      },
      {
        text: fr
          ? "c) La diminution du nombre de transactions"
          : "c) A decrease in the number of transactions",
        isCorrect: false,
        rationale: fr ? (
          <>Ah non ! Les transactions ne contrôlent pas la sécurité du réseau.</>
        ) : (
          <>Not at all! The number of transactions does not control network security.</>
        ),
      },
    ],
  };
};
