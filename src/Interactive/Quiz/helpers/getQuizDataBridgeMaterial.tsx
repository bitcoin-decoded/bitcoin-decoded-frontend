import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataBridgeMaterial = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr ? "Alors, quel matériau vas-tu utiliser ?" : "So, which material will you use?",
    answers: [
      {
        text: fr
          ? "a) Je choisis l'acier, c'est le matériau du futur, il faut bien que ce pont dure 100 ans !"
          : "a) I'll go with steel - it's the material of the future, this bridge has to last 100 years!",
        isCorrect: false,
        rationale: fr ? (
          <>
            Tu joues à la loterie avec les ressources de la société ! Sans prix, comment savoir si
            l'acier utilisé pour ton pont n'est pas 100 fois plus utile ailleurs pour fabriquer des
            scalpels chirurgicaux ? Ou si le béton utilisé n'aurait pas été plus précieux pour
            construire des logements urgents ?
          </>
        ) : (
          <>
            You're playing the lottery with society's resources! Without prices, how can you know
            the steel for your bridge isn't 100 times more useful elsewhere - say, for surgical
            scalpels? Or whether the concrete would've been better spent on emergency housing?
          </>
        ),
      },
      {
        text: fr
          ? "b) Je choisis le béton, c'est plus simple et moins cher, et on en trouvera toujours plus facilement."
          : "b) I'll go with concrete - it's simpler, cheaper, and easier to come by.",
        isCorrect: false,
        rationale: fr ? (
          <>
            Tu joues à la loterie avec les ressources de la société ! Sans prix, comment savoir si
            l'acier utilisé pour ton pont n'est pas 100 fois plus utile ailleurs pour fabriquer des
            scalpels chirurgicaux ? Ou si le béton utilisé n'aurait pas été plus précieux pour
            construire des logements urgents ?
          </>
        ) : (
          <>
            You're playing the lottery with society's resources! Without prices, how can you know
            the steel for your bridge isn't 100 times more useful elsewhere - say, for surgical
            scalpels? Or whether the concrete would've been better spent on emergency housing?
          </>
        ),
      },
      {
        text: fr
          ? "c) Je n'en ai aucune fichtre idée, il me manque une information vitale pour trancher !"
          : "c) I haven't the foggiest - I'm missing a vital piece of information to decide!",
        isCorrect: true,
        rationale: fr ? (
          <>
            Bravo, tu viens de tomber sur l'argument de Mises. Sans prix, tu compares des choux et
            des carottes. Combien de tonnes d'acier « valent » combien de tonnes de béton, plus
            combien d'énergie, plus combien d'heures de travail ? Il te manque une unité commune
            pour comparer des choses qui n'ont rien à voir. Le prix, c'est cette unité. Enlève-le,
            et la question n'a tout simplement plus de réponse.
          </>
        ) : (
          <>
            You've just put your finger on Mises's argument. Without prices, you're comparing apples
            and oranges. How many tonnes of steel "are worth" how many tonnes of concrete, plus how
            much energy, plus how many work hours? You're missing a common unit to compare things
            that have nothing in common. The price is that unit. Take it away, and the question has
            no answer at all.
          </>
        ),
      },
    ],
  };
};
