import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataRobinson = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Selon toi, que devrait faire Robinson ?"
      : "In your opinion, what should Robinson do?",
    answers: [
      {
        text: fr
          ? "Laisser tomber le projet, la situation ne peut pas évoluer !"
          : "Give up the project - the situation can't improve!",
        isCorrect: false,
        rationale: fr ? (
          <>Allons, en es-tu bien certain ? N'y a-t-il pas une marge de manœuvre pour Robinson ?</>
        ) : (
          <>Come on, are you sure about that? Isn't there some room to maneuver for Robinson?</>
        ),
      },
      {
        text: fr
          ? "Se constituer un stock de poissons en pêchant un peu plus longtemps ou en mangeant un peu moins chaque jour."
          : "Build up a fish reserve by fishing a little longer or eating a little less each day.",
        isCorrect: true,
        rationale: fr ? (
          <>
            Dans le mille ! Robinson a compris qu'il doit créer un surplus (en travaillant plus ou
            en consommant moins) pour financer son détour de production (le filet).
          </>
        ) : (
          <>
            Bullseye! Robinson figured out that he needs to create a surplus (by working more or
            consuming less) to pay for his roundabout production (the net).
          </>
        ),
      },
      {
        text: fr
          ? "Se lancer tête baissée dans le tressage du filet : avec de la volonté, on peut tout faire !"
          : "Dive headfirst into weaving the net: with enough willpower, anything is possible!",
        isCorrect: false,
        rationale: fr ? (
          <>
            Mauvaise idée ! Au bout du deuxième jour, Robinson sera trop faible pour finir son
            filet. On ne peut pas ignorer les besoins du présent pour construire le futur.
          </>
        ) : (
          <>
            Bad idea! By day two, Robinson will be too weak to finish his net. You can't ignore
            today's needs to build tomorrow.
          </>
        ),
      },
    ],
  };
};
