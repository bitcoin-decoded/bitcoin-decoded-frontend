import type { QuizData } from "../types";
import type { Language } from "../../I18n";

export const getQuizDataRobinson = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Selon vous, que devrait faire Robinson ?"
      : "In your opinion, what should Robinson do?",
    answers: [
      {
        text: fr
          ? "a) Laisser tomber le projet, la situation ne peut pas évoluer !"
          : "a) Give up the project, the situation can't improve!",
        isCorrect: false,
        rationale: fr ? (
          <>
            Allons, en êtes-vous bien certain ? N'y a t-il pas une marche de
            manoeuvre pour Robinson ?
          </>
        ) : (
          <>
            Come on, are you sure about that? Isn't there some room for
            maneuver for Robinson?
          </>
        ),
      },
      {
        text: fr
          ? "b) Se constituer un stock de poissons en pêchant un peu plus longtemps ou en mangeant un peu moins chaque jour."
          : "b) Build up a fish reserve by fishing a little longer or eating a little less each day.",
        isCorrect: true,
        rationale: fr ? (
          <>
            Dans le mille ! Robinson a compris qu'il doit créer un surplus
            (en travaillant plus ou en consommant moins) pour financer son détour
            de production (le filet).
          </>
        ) : (
          <>
            Bullseye! Robinson understood that he must create a surplus
            (by working more or consuming less) to fund his roundabout
            production (the net).
          </>
        ),
      },
      {
        text: fr
          ? "c) Se lancer tête baissée dans le tressage du filet : avec de la volonté, on peut tout faire !"
          : "c) Dive headfirst into weaving the net: with willpower, anything is possible!",
        isCorrect: false,
        rationale: fr ? (
          <>
            Mauvaise idée ! Au bout du deuxième jour, Robinson sera trop faible
            pour finir son filet. On ne peut pas ignorer les besoins du présent
            pour construire le futur.
          </>
        ) : (
          <>
            Bad idea! By the second day, Robinson will be too weak
            to finish his net. You can't ignore present needs
            to build the future.
          </>
        ),
      },
    ],
  };
};
