import type { Language } from "../../../I18n";

export const getUsersDebtsDefault = (language: Language) => {
  const fr = language === "fr";
  return {
    before: {
      bank: {
        assets: [
          {
            amount: "20 000 000 €",
            description: fr
              ? "(créances totales auprès des clients)"
              : "(total claims from customers)",
          },
          {
            amount: "30 000 000 €",
            description: fr
              ? "(autres actifs divers)"
              : "(various other assets)",
          },
        ],
        liabilities: [
          {
            amount: "30 000 000 €",
            description: fr ? "(capital propre)" : "(equity)",
          },
          {
            amount: "20 000 000 €",
            description: fr
              ? "(autres passifs divers)"
              : "(various other liabilities)",
          },
        ],
      },
    },
    after: {
      bank: {
        assets: [
          {
            amount: "5 000 000 €",
            description: fr
              ? "(créances totales auprès des clients)"
              : "(total claims from customers)",
            hasChanged: true,
          },
          {
            amount: "30 000 000 €",
            description: fr
              ? "(autres actifs divers)"
              : "(various other assets)",
          },
        ],
        liabilities: [
          {
            amount: "15 000 000 €",
            description: fr ? "(Capital propre)" : "(Equity)",
            hasChanged: true,
          },
          {
            amount: "20 000 000 €",
            description: fr
              ? "(autres passifs divers)"
              : "(various other liabilities)",
          },
        ],
      },
    },
  };
};
