import type { QuizData } from "../types";
import type { Language } from "../../I18n";

export const getQuizDataByzantine = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Comment garantir que tous les généraux prennent la même décision, sans se faire confiance ?"
      : "How can you guarantee that all generals make the same decision without trusting each other?",
    answers: [
      {
        text: fr
          ? "a) Envoyer plus de messagers pour confirmer l'information"
          : "a) Send more messengers to confirm the information",
        isCorrect: false,
        rationale: fr ? (
          <>
            Ajouter des messagers ne résout rien.
            Si les messages peuvent être falsifiés ou perdus, multiplier les
            confirmations ne fait que multiplier l'incertitude.
          </>
        ) : (
          <>
            Adding messengers solves nothing.
            If messages can be forged or lost, multiplying confirmations only
            multiplies uncertainty.
          </>
        ),
      },
      {
        text: fr
          ? "b) Faire confiance au premier message reçu"
          : "b) Trust the first message received",
        isCorrect: false,
        rationale: fr ? (
          <>
            Faire confiance au premier message est risqué.
            Rien ne garantit qu'il soit correct ou partagé par les autres
            généraux.
          </>
        ) : (
          <>
            Trusting the first message is risky.
            Nothing guarantees it is correct or shared by the other generals.
          </>
        ),
      },
      {
        text: fr
          ? "c) Exiger une preuve difficile à produire avant d'agir"
          : "c) Require a proof that is difficult to produce before acting",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exact. Au lieu de faire confiance aux messages, on exige une preuve
            coûteuse à produire mais facile à vérifier. C'est précisément ce que
            fait Bitcoin avec la preuve de travail.
          </>
        ) : (
          <>
            Exactly. Instead of trusting messages, we require a proof that is
            costly to produce but easy to verify. This is precisely what Bitcoin
            does with proof of work.
          </>
        ),
      },
    ],
  };
};
