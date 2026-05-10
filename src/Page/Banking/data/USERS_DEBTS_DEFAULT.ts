import type { Language } from "../../../I18n";

export const getUsersDebtsDefault = (language: Language) => {
  const fr = language === "fr";
  return {
    before: {
      bank: {
        assets: [
          {
            amount: fr ? "20 000 000 €" : "$20,000,000",
            description: fr
              ? "(créances totales auprès des clients)"
              : "(total claims from customers)",
          },
          {
            amount: fr ? "30 000 000 €" : "$30,000,000",
            description: fr ? "(autres actifs divers)" : "(various other assets)",
          },
        ],
        liabilities: [
          {
            amount: fr ? "30 000 000 €" : "$30,000,000",
            description: fr ? "(capital propre)" : "(equity)",
          },
          {
            amount: fr ? "20 000 000 €" : "$20,000,000",
            description: fr ? "(autres passifs divers)" : "(various other liabilities)",
          },
        ],
      },
    },
    after: {
      bank: {
        assets: [
          {
            amount: fr ? "5 000 000 €" : "$5,000,000",
            description: fr
              ? "(créances totales auprès des clients)"
              : "(total claims from customers)",
            hasChanged: true,
          },
          {
            amount: fr ? "30 000 000 €" : "$30,000,000",
            description: fr ? "(autres actifs divers)" : "(various other assets)",
          },
        ],
        liabilities: [
          {
            amount: fr ? "15 000 000 €" : "$15,000,000",
            description: fr ? "(Capital propre)" : "(Equity)",
            hasChanged: true,
          },
          {
            amount: fr ? "20 000 000 €" : "$20,000,000",
            description: fr ? "(autres passifs divers)" : "(various other liabilities)",
          },
        ],
      },
    },
  };
};
