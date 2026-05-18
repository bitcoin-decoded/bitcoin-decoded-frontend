import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataByzantine = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Comment trancher entre deux transactions concurrentes, sans autorité centrale ?"
      : "How can you settle between two competing transactions, without a central authority?",
    answers: [
      {
        text: fr
          ? "a) Compter les nœuds qui ont reçu chaque transaction en premier, et garder la majorité"
          : "a) Count the nodes that received each transaction first, and keep the majority",
        isCorrect: false,
        rationale: fr ? (
          <>
            Tentant, mais inutilisable. N'importe qui peut créer des milliers de faux nœuds pour
            faire pencher le vote. Compter des identités sans coût, c'est ouvrir la porte à la
            fraude.
          </>
        ) : (
          <>
            Tempting, but unusable. Anyone can spin up thousands of fake nodes to tilt the vote.
            Counting identities with no cost opens the door to fraud.
          </>
        ),
      },
      {
        text: fr
          ? "b) Faire confiance à la première transaction reçue par chaque nœud"
          : "b) Trust the first transaction received by each node",
        isCorrect: false,
        rationale: fr ? (
          <>
            C'est exactement ce que montre l'exemple ci-dessus : selon la latence du réseau, chaque
            nœud reçoit une version différente en premier. Aucun consensus possible.
          </>
        ) : (
          <>
            That's exactly what the example above shows: depending on network latency, each node
            receives a different version first. No consensus possible.
          </>
        ),
      },
      {
        text: fr
          ? "c) Exiger une preuve coûteuse à produire avant d'inscrire la transaction dans le registre"
          : "c) Require a costly proof before inscribing the transaction in the ledger",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exact. Au lieu de compter des identités ou de faire confiance au plus rapide, on exige
            une preuve coûteuse à produire mais facile à vérifier. C'est précisément ce que fait
            Bitcoin avec la preuve de travail.
          </>
        ) : (
          <>
            Exactly. Instead of counting identities or trusting the fastest, we require a proof that
            is costly to produce but easy to verify. This is precisely what Bitcoin does with proof
            of work.
          </>
        ),
      },
    ],
  };
};
