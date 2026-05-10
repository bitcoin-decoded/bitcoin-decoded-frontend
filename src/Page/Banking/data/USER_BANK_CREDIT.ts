import type { Language } from "../../../I18n";

export const getUserBankCredit = (language: Language) => {
  const fr = language === "fr";
  return {
    before: {
      bank: {
        assets: [
          {
            amount: fr ? "1 000 000 €" : "$1,000,000",
            description: fr
              ? "(toutes les créances auprès des clients)"
              : "(all claims from customers)",
          },
        ],
        liabilities: [
          {
            amount: fr ? "1 000 000 €" : "$1,000,000",
            description: fr
              ? "(tous les dépôts correspondants, sur les comptes des clients)"
              : "(all corresponding deposits in customers' accounts)",
          },
        ],
      },
    },
    after: {
      bank: {
        assets: [
          {
            amount: fr ? "1 000 000 €" : "$1,000,000",
            description: fr
              ? "(toutes les créances auprès des clients)"
              : "(all claims from customers)",
          },
          {
            amount: fr ? "200 000 €" : "$200,000",
            description: fr ? "(créance sur Nicolas)" : "(claim on Nicolas)",
            hasChanged: true,
          },
        ],
        liabilities: [
          {
            amount: fr ? "1 000 000 €" : "$1,000,000",
            description: fr
              ? "(tous les dépôts correspondants, sur les comptes des clients)"
              : "(all corresponding deposits in customers' accounts)",
          },
          {
            amount: fr ? "200 000 €" : "$200,000",
            description: fr
              ? "(dépôt sur le compte de Nicolas)"
              : "(deposit on Nicolas)",
            hasChanged: true,
          },
        ],
      },
    },
  };
};
