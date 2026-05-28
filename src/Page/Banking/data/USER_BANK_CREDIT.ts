import type { Language } from "../../../I18n";

export const getUserBankCredit = (language: Language) => {
  const fr = language === "fr";
  return {
    before: {
      bank: {
        assets: [
          {
            amount: fr ? "480 000 000 €" : "€480,000,000",
            description: fr ? "(toutes les créances sur les clients)" : "(all claims on customers)",
          },
        ],
        liabilities: [
          {
            amount: fr ? "480 000 000 €" : "€480,000,000",
            description: fr
              ? "(tous les dépôts correspondants, sur les comptes des clients)"
              : "(all matching deposits in customers' accounts)",
          },
        ],
      },
    },
    after: {
      bank: {
        assets: [
          {
            amount: fr ? "480 000 000 €" : "€480,000,000",
            description: fr ? "(toutes les créances sur les clients)" : "(all claims on customers)",
          },
          {
            amount: fr ? "200 000 €" : "€200,000",
            description: fr ? "(créance sur Nicolas)" : "(claim on Nicolas)",
            hasChanged: true,
          },
        ],
        liabilities: [
          {
            amount: fr ? "480 000 000 €" : "€480,000,000",
            description: fr
              ? "(tous les dépôts correspondants, sur les comptes des clients)"
              : "(all matching deposits in customers' accounts)",
          },
          {
            amount: fr ? "200 000 €" : "€200,000",
            description: fr ? "(dépôt sur le compte de Nicolas)" : "(deposit in Nicolas's account)",
            hasChanged: true,
          },
        ],
      },
    },
  };
};
