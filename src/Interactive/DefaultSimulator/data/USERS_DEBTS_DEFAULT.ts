import type { Language } from "../../../I18n";

export const getUsersDebtsDefault = (language: Language) => {
  const fr = language === "fr";
  return {
    before: {
      bank: {
        assets: [
          {
            amount: fr ? "500 000 000 €" : "€500,000,000",
            description: fr
              ? "(toutes les créances sur les clients, dont celle de Nicolas)"
              : "(all claims on customers, including that of Nicolas)",
          },
          {
            amount: fr ? "9 800 000 €" : "€9,800,000",
            description: fr ? "(Réserves M0)" : "(M0 Reserves)",
          },
        ],
        liabilities: [
          {
            amount: fr ? "440 000 000 €" : "€440,000,000",
            description: fr
              ? "(tous les dépôts des clients, sauf Nicolas qui a transféré son argent chez Mme Michu)"
              : "(all customer deposits, except Nicolas who transferred his money to Ms. Smith)",
          },
          {
            amount: fr ? "20 000 000 €" : "€20,000,000",
            description: fr ? "(dette envers la Banque Centrale)" : "(debt to the Central Bank)",
          },
          {
            amount: fr ? "49 800 000 €" : "€49,800,000",
            description: fr ? "(capital propre)" : "(equity)",
          },
        ],
      },
    },
    after: {
      bank: {
        assets: [
          {
            amount: fr ? "470 000 000 €" : "€470,000,000",
            description: fr
              ? "(toutes les créances sur les clients, dont celle de Nicolas)"
              : "(all claims on customers, including that of Nicolas)",
            hasChanged: true,
          },
          {
            amount: fr ? "9 800 000 €" : "€9,800,000",
            description: fr ? "(Réserves M0)" : "(M0 Reserves)",
          },
        ],
        liabilities: [
          {
            amount: fr ? "440 000 000 €" : "€440,000,000",
            description: fr
              ? "(tous les dépôts des clients, sauf Nicolas qui a transféré son argent chez Mme Michu)"
              : "(all customer deposits, except Nicolas who transferred his money to Ms. Smith)",
          },
          {
            amount: fr ? "20 000 000 €" : "€20,000,000",
            description: fr ? "(dette envers la Banque Centrale)" : "(debt to the Central Bank)",
          },
          {
            amount: fr ? "19 800 000 €" : "€19,800,000",
            description: fr ? "(capital propre)" : "(equity)",
            hasChanged: true,
          },
        ],
      },
    },
  };
};
