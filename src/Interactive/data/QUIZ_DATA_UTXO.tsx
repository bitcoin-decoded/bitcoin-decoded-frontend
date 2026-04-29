import type { QuizData } from "../types";
import type { Language } from "../../I18n";

export const getQuizDataUtxo = (language: Language): QuizData => {
  const fr = language === "fr";

  return {
    question: fr
      ? "Dans le modèle Bitcoin, que représente la différence entre la somme des entrées et la somme des sorties ?"
      : "In the Bitcoin model, what does the difference between the sum of inputs and the sum of outputs represent?",
    answers: [
      {
        text: fr ? "a) Les frais de transaction" : "a) Transaction fees",
        isCorrect: true,
        rationale: fr ? (
          <>
            Exact. Cette différence constitue les frais, qui reviennent au mineur
            qui inclut la transaction dans un bloc. Plus cette différence est
            élevée, plus la transaction sera attractive pour les mineurs.
          </>
        ) : (
          <>
            Correct. This difference constitutes the fees, which go to the miner
            who includes the transaction in a block. The higher this difference,
            the more attractive the transaction is for miners.
          </>
        ),
      },
      {
        text: fr ? "b) Un nouveau bitcoin créé par le portefeuille" : "b) A new bitcoin created by the wallet",
        isCorrect: false,
        rationale: fr ? (
          <>
            Non. Le portefeuille ne crée rien : il organise seulement des
            dépenses à partir d'UTXO existants. Seul le protocole peut émettre
            de nouveaux bitcoins, via la subvention de bloc.
          </>
        ) : (
          <>
            No. The wallet creates nothing: it only organises spending from
            existing UTXOs. Only the protocol can issue new bitcoins, via the
            block subsidy.
          </>
        ),
      },
      {
        text: fr ? "c) Une taxe fixée par la banque centrale" : "c) A tax set by the central bank",
        isCorrect: false,
        rationale: fr ? (
          <>
            Non. Il n'existe pas d'autorité centrale dans Bitcoin. Les frais
            sont déterminés par la structure de la transaction et le marché :
            c'est l'offre et la demande d'espace dans un bloc qui les fixe.
          </>
        ) : (
          <>
            No. There is no central authority in Bitcoin. Fees are determined
            by the transaction structure and the market: it is supply and demand
            for block space that sets them.
          </>
        ),
      },
    ],
  };
};
