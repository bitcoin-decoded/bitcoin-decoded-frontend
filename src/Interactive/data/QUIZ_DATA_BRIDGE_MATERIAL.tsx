import type { QuizData } from "../types";
import type { Language } from "../../I18n";

export const getQuizDataBridgeMaterial = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Alors, quel matériau allez-vous utiliser ?"
      : "So, which material will you use?",
    answers: [
      {
        text: fr
          ? "a) Je choisis l'acier, c'est le matériau du futur, il faut bien que ce pont dure 100 ans !"
          : "a) I choose steel, it's the material of the future, this bridge needs to last 100 years!",
        isCorrect: false,
        rationale: fr ? (
          <>
            Vous jouez à la loterie avec les ressources de la société ! Sans
            prix, comment savoir si l'acier utilisé pour votre pont n'est pas 100
            fois plus utile ailleurs pour fabriquer des scalpels chirurgicaux ? Ou
            si le béton utilisé n'aurait pas été plus précieux pour construire des
            logements urgents ?
          </>
        ) : (
          <>
            You're gambling with society's resources! Without prices, how can
            you know if the steel used for your bridge isn't 100 times more
            useful elsewhere for making surgical scalpels? Or if the concrete
            wouldn't have been more valuable for building emergency housing?
          </>
        ),
      },
      {
        text: fr
          ? "b) Je choisis le béton, c'est plus simple et moins cher, et on en trouvera toujours plus facilement."
          : "b) I choose concrete, it's simpler and cheaper, and always easier to find.",
        isCorrect: false,
        rationale: fr ? (
          <>
            Vous jouez à la loterie avec les ressources de la société ! Sans
            prix, comment savoir si l'acier utilisé pour votre pont n'est pas 100
            fois plus utile ailleurs pour fabriquer des scalpels chirurgicaux ? Ou
            si le béton utilisé n'aurait pas été plus précieux pour construire des
            logements urgents ?
          </>
        ) : (
          <>
            You're gambling with society's resources! Without prices, how can
            you know if the steel used for your bridge isn't 100 times more
            useful elsewhere for making surgical scalpels? Or if the concrete
            wouldn't have been more valuable for building emergency housing?
          </>
        ),
      },
      {
        text: fr
          ? "c) Je n'en ai aucune fichtre idée, il me manque une information vitale pour trancher !"
          : "c) I have absolutely no idea, I'm missing vital information to decide!",
        isCorrect: true,
        rationale: fr ? (
          <>
            Félicitations, vous avez compris le génie de Mises ! Sans prix
            de marché, vous ne pouvez pas comparer le « coût social » d'un
            matériau par rapport à un autre. Vous n'avez pas de dénominateur
            commun.
          </>
        ) : (
          <>
            Congratulations, you've grasped Mises' genius! Without market
            prices, you cannot compare the "social cost" of one material
            against another. You have no common denominator.
          </>
        ),
      },
    ],
  };
};
