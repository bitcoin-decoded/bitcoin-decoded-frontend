import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataProfileChoice = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Alors, à quel profil préféres-tu accorder un prêt ?"
      : "So, which profile would you rather lend to?",
    answers: [
      {
        text: fr ? "a) M. Géo Trouve-Tout" : "a) Mr. Gyro Gearloose",
        isCorrect: false,
        rationale: fr ? (
          <>
            Refusé ! Désolé pour Géo... Son projet est génial, mais trop risqué. Avec une marge
            minuscule (souviens-toi du chapitre précédent), la banque ne peut pas se permettre le
            moindre défaut de paiement. Sans garantie solide à saisir, c'est non.
          </>
        ) : (
          <>
            Rejected! Sorry, Gyro... Great project, but too risky. With margins this thin (remember
            the previous chapter), the bank can't afford a single missed payment. No solid
            collateral to seize? Then it's a no.
          </>
        ),
      },
      {
        text: fr ? "b) M. Balthazar Picsou" : "b) Mr. Scrooge McDuck",
        isCorrect: true,
        rationale: fr ? (
          <>
            Bingo ! C'est de l'argent facile. Le prêt est adossé à son portefeuille d'actions
            existant : c'est ce qu'on appelle le nantissement. Si Picsou ne rembourse pas, la banque
            saisit ses titres et les vend en un clic (et c'est un retour au French Dream !). Risque
            quasi nul. Dossier validé !
          </>
        ) : (
          <>
            Bingo! Easy money. The loan is backed by his existing stock portfolio: that's what's
            called collateralization. If Scrooge doesn't pay, the bank seizes his shares and sells
            them in one click (welcome back to the American Dream!). Risk close to zero. Approved!
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
            Our <i>Ms. Michu</i> has nothing to do with this one, for once!
          </>
        ),
      },
    ],
  };
};
