import type { Language } from "../../../I18n";
import type { QuizData } from "../types";

export const getQuizDataHalving = (language: Language): QuizData => {
  const fr = language === "fr";
  return {
    question: fr
      ? "Après un halving, qu'est-ce qui maintient l'équilibre du réseau ?"
      : "After a halving, what keeps the network in balance?",
    answers: [
      {
        text: fr
          ? "L'ajustement automatique de la difficulté et la concurrence entre les mineurs"
          : "Automatic difficulty adjustment and competition among miners",
        isCorrect: true,
        rationale: fr ? (
          <>
            <p>
              Exactement. Souviens-toi : le système ajuste dynamiquement sa cible de difficulté.
              Après un halving, si la rentabilité baisse et que certains mineurs quittent le réseau,
              la difficulté finit par s'ajuster à la baisse :
            </p>
            <ul>
              <li>ça améliore l'équation économique pour les mineurs déjà en place</li>
              <li>
                ça peut attirer de nouveaux entrants si les conditions du marché redeviennent
                favorables
              </li>
            </ul>
          </>
        ) : (
          <>
            <p>
              Exactly. Remember: the system dynamically adjusts its difficulty target. After a
              halving, if profitability drops and some miners leave, the difficulty eventually
              adjusts downward:
            </p>
            <ul>
              <li>that improves the economics for miners already in place</li>
              <li>and it can pull in new entrants if market conditions turn favourable again</li>
            </ul>
          </>
        ),
      },
      {
        text: fr ? "La hausse du prix du bitcoin" : "A rise in the price of bitcoin",
        isCorrect: false,
        rationale: fr ? (
          <>
            Tentant, mais incomplet. Un prix qui grimpe peut compenser un halving à court terme,
            c'est vrai. Mais ça ne dit rien sur ce qui se passe quand le prix stagne ou baisse. Le
            vrai mécanisme structurel, c'est l'ajustement automatique de la difficulté, qui
            fonctionne quelle que soit l'humeur du marché.
          </>
        ) : (
          <>
            Tempting, but incomplete. A rising price can offset a halving in the short term, true.
            But it tells you nothing about what happens when the price stagnates or drops. The real
            structural mechanism is the automatic difficulty adjustment, which keeps working
            whatever mood the market is in.
          </>
        ),
      },
      {
        text: fr
          ? "La diminution du nombre de transactions"
          : "A drop in the number of transactions",
        isCorrect: false,
        rationale: fr ? (
          <>
            Mauvaise piste. Moins de transactions, ce serait surtout moins de frais pour les
            mineurs, donc le contraire d'un rééquilibrage. L'équilibre du réseau ne dépend pas du
            volume de transactions, mais du couple difficulté + concurrence entre mineurs.
          </>
        ) : (
          <>
            Wrong track. Fewer transactions would mean fewer fees for miners, which is the opposite
            of rebalancing. Network equilibrium doesn't depend on transaction volume, but on the
            difficulty + miner competition pair.
          </>
        ),
      },
    ],
  };
};
