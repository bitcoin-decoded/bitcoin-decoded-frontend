import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataByzantine = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Comment trancher entre deux transactions concurrentes, quand t'as pas d'autorité centrale ?"
      : "How do you settle a dispute between two competing transactions, with no central authority?",
    answers: [
      {
        text: fr
          ? "a) Compter les nœuds qui ont reçu chaque transaction en premier, et prendre l'avis de la majorité"
          : "a) Count the nodes that received each transaction first, and go with the majority",
        isCorrect: false,
        rationale: fr ? (
          <>
            Tentant, mais non. N'importe qui peut créer des milliers de faux nœuds pour faire
            pencher le vote. Compter des identités sans coût, c'est ouvrir la porte à la triche.
          </>
        ) : (
          <>
            Tempting, but no. Anyone can spin up thousands of fake nodes to tilt the vote. Counting
            identities at zero cost is an open door to cheating.
          </>
        ),
      },
      {
        text: fr
          ? "b) Faire confiance à la première transaction reçue par chaque nœud"
          : "b) Trust the first transaction each node happens to receive",
        isCorrect: false,
        rationale: fr ? (
          <>
            C'est exactement ce que montre l'exemple ci-dessus : selon la latence du réseau, chaque
            nœud reçoit une version différente en premier. Aucun consensus possible.
          </>
        ) : (
          <>
            That's exactly what the example above showed: depending on network latency, each node
            sees a different version first. No consensus possible.
          </>
        ),
      },
      {
        text: fr
          ? "c) Exiger une preuve coûteuse à produire avant d'inscrire la transaction dans le registre"
          : "c) Require a costly proof before the transaction can be written into the ledger",
        isCorrect: true,
        rationale: fr ? (
          <>
            Bravo champion. Au lieu de compter des identités ou de faire aveuglément confiance au
            plus rapide, on exige une preuve de travail (Proof of Work) - coûteuse à produire en
            calcul, facile à vérifier. C'est le mécanisme central de Bitcoin.
          </>
        ) : (
          <>
            Nailed it. Instead of counting identities or blindly trusting whoever is fastest, the
            network requires Proof of Work - costly to produce in computation, cheap to verify.
            That's the core mechanism of Bitcoin.
          </>
        ),
      },
    ],
  };
};
