import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataM2Explosion = (language: Language): QuizData => {
  const fr = language === "fr";

  return {
    question: fr
      ? "Selon toi, à quoi correspond ce graphique ?"
      : "What do you think this chart represents?",
    answers: [
      {
        text: fr
          ? "L'évolution du cours de l'or en dollars."
          : "The evolution of gold prices in dollars.",
        isCorrect: false,
        rationale: fr ? (
          <>
            L'or a effectivement connu une forte hausse, mais sa courbe n'affiche pas ce type
            d'accélération verticale.
          </>
        ) : (
          <>
            Gold has indeed climbed sharply, but its curve doesn't show this kind of vertical
            acceleration.
          </>
        ),
      },
      {
        text: fr
          ? "L'évolution de la masse monétaire américaine (M2)"
          : "The evolution of the US money supply (M2)",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exactement. Ce graphique représente la masse monétaire M2 des États-Unis, c'est-à-dire
            l'ensemble des dollars en circulation (billets, comptes courants, épargne accessible).
          </>
        ) : (
          <>
            Exactly. This chart shows the US M2 money supply, meaning all the dollars in circulation
            (bills, checking accounts, accessible savings).
          </>
        ),
      },
      {
        text: fr
          ? "Le nombre de fonctionnaires en France depuis 1960."
          : "The number of civil servants in France since 1960.",
        isCorrect: false,
        rationale: fr ? (
          <>
            L'administration française est généreuse, mais pas à ce point ! L'échelle se compte ici
            en milliers de milliards. Regarde bien l'axe vertical.
          </>
        ) : (
          <>
            The French civil service is generous, but not that generous. The scale here is in
            trillions. Take a closer look at the vertical axis.
          </>
        ),
      },
    ],
  };
};
