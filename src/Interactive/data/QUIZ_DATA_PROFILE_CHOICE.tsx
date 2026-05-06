import type { Language } from "../../I18n";
import type { QuizData } from "../types";

export const getQuizDataProfileChoice = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Alors, à quel profil préférez-vous accorder un prêt ?"
      : "So, which profile would you prefer to grant a loan to?",
    answers: [
      {
        text: fr ? "a) M. Géo Trouve-Tout" : "a) Mr. Gyro Gearloose",
        isCorrect: false,
        rationale: fr ? (
          <>
            Refusé ! Désolé pour Géo... Son projet est génial, mais trop risqué. Avec une marge
            minuscule (souvenez-vous du chapitre précédent), la banque ne peut pas se permettre le
            moindre défaut de paiement. Sans garantie solide à saisir, c'est non.
          </>
        ) : (
          <>
            Rejected! Sorry for Gyro... His project is brilliant, but too risky. With a tiny margin
            (remember the previous chapter), the bank cannot afford the slightest payment default.
            Without solid collateral to seize, it's no.
          </>
        ),
      },
      {
        text: fr ? "b) M. Balthazar Picsou" : "b) Mr. Scrooge McDuck",
        isCorrect: true,
        rationale: fr ? (
          <>
            Bingo ! C'est de l'argent facile. Le prêt est sécurisé à 100% par son portefeuille
            d'actions existant : c'est ce qu'on appelle le nantissement. S'il ne paie pas, la banque
            vend ses titres en un clic. Risque = 0. Dossier validé !
          </>
        ) : (
          <>
            Bingo! It's easy money. The loan is 100% secured by his existing stock portfolio—this is
            what's called collateralization. If he doesn't pay, the bank sells his securities in one
            click. Risk = 0. File validated!
          </>
        ),
      },
      {
        text: fr ? "c) Mme Michu pour sûr !" : "c) Ms. Michu for sure!",
        isCorrect: false,
        rationale: fr ? (
          <>
            Notre <i>Madame Michu</i> n'a rien à voir dans cette histoire pour une fois !
          </>
        ) : (
          <>
            Our <i>Ms. Michu</i> has nothing to do with this story for once!
          </>
        ),
      },
    ],
  };
};
