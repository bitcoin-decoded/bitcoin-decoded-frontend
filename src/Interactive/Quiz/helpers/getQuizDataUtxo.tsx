import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataUtxo = (language: Language): QuizData => {
  const fr = language === "fr";

  return {
    question: fr
      ? "Dans le modèle Bitcoin, que représente la différence entre la somme des entrées et la somme des sorties ?"
      : "In the Bitcoin model, what does the difference between the sum of inputs and the sum of outputs represent?",
    answers: [
      {
        text: fr ? "Les frais de transaction" : "The transaction fees",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exact. Cette différence constitue les frais, qui reviennent au mineur qui inclut la
            transaction dans un bloc. Plus les frais proposés sont élevés par rapport à la taille de
            la transaction (en sat/vB), plus le mineur a intérêt à l'inclure rapidement.
          </>
        ) : (
          <>
            Correct. That difference is the fee, which goes to the miner who includes the
            transaction in a block. The higher the fee relative to the transaction's size (in
            sat/vB), the stronger the incentive for a miner to include it quickly.
          </>
        ),
      },
      {
        text: fr ? "La monnaie rendue à l'expéditeur" : "The change returned to the sender",
        isCorrect: false,
        rationale: fr ? (
          <>
            Non. La monnaie rendue est elle-même une sortie de la transaction : elle est donc déjà
            comptée dans la somme des sorties. La différence entrées − sorties capture autre chose :
            la part qui n'a été attribuée à aucune sortie explicite. C'est ça, les frais.
          </>
        ) : (
          <>
            No. The change is itself one of the transaction's outputs, so it's already counted in
            the sum of outputs. The difference inputs − outputs captures something else: the portion
            that wasn't assigned to any explicit output. That's what fees are.
          </>
        ),
      },
      {
        text: fr
          ? "La valeur effectivement transférée au destinataire"
          : "The value actually transferred to the recipient",
        isCorrect: false,
        rationale: fr ? (
          <>
            Non. La valeur transférée au destinataire est une des sorties créées par la transaction.
            Elle est donc déjà comptée dans la somme des sorties, au même titre que la monnaie
            rendue à l'expéditeur. Ce que mesure la différence entrées − sorties, c'est ce qui ne va
            à aucun des deux : les frais collectés par le mineur.
          </>
        ) : (
          <>
            No. The value transferred to the recipient is one of the outputs created by the
            transaction. It's already counted in the sum of outputs, just like the change returned
            to the sender. What the difference inputs − outputs measures is what goes to neither of
            them: the fee collected by the miner.
          </>
        ),
      },
    ],
  };
};
