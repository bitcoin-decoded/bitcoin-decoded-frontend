import type { Language } from "../../../I18n";

export const getUserBankCredit = (language: Language) => {
  const fr = language === "fr";
  return {
    before: {
      bank: {
        assets: [
          {
            amount: "1 000 000 €",
            description: fr
              ? "(toutes les créances auprès des clients)"
              : "(all claims from customers)",
          },
        ],
        liabilities: [
          {
            amount: "1 000 000 €",
            description: fr
              ? "(tous les dépôts des créances, sur les comptes des clients)"
              : "(all claim deposits on customer accounts)",
          },
        ],
      },
    },
    after: {
      bank: {
        assets: [
          {
            amount: "1 000 000 €",
            description: fr
              ? "(toutes les créances auprès des clients)"
              : "(all claims from customers)",
          },
          {
            amount: "200 000 €",
            description: fr
              ? "(créance sur M. QuiPaye)"
              : "(claim on Mr. WhoPays)",
            hasChanged: true,
          },
        ],
        liabilities: [
          {
            amount: "1 000 000 €",
            description: fr
              ? "(tous les dépôts des créances, sur les comptes des clients)"
              : "(all claim deposits on customer accounts)",
          },
          {
            amount: "200 000 €",
            description: fr
              ? "(dépôt sur le compte de M. QuiPaye)"
              : "(deposit on Mr. WhoPays's account)",
            hasChanged: true,
          },
        ],
      },
    },
  };
};
