import type { Language } from "../../../I18n";

export const getUserBankCompensation = (language: Language) => {
  const fr = language === "fr";
  return {
    before: {
      bank: {
        assets: [
          {
            amount: "1 200 000 €",
            description: fr
              ? "(toutes les créances auprès des clients dont celle de Nicolas QuiPaye)"
              : "(all claims from customers including Nicolas WhoPays)",
          },
          {
            amount: "2 000 000 €",
            description: fr ? "(Réserves M0)" : "(M0 Reserves)",
          },
        ],
        liabilities: [
          {
            amount: "1 000 000 €",
            description: fr
              ? "(tous les dépôts correspondants sur les comptes des clients sauf Nicolas QuiPaye, qui a transféré son argent chez Mme Michu)"
              : "(all corresponding deposits in customers' accounts except Nicolas WhoPays, who transferred its money to Ms. Michu)",
          },
          {
            amount: "200 000 €",
            description: fr
              ? "(dette M0 envers la banque de Mme Michu)"
              : "(M0 debt to Ms. Michu's bank)",
          },
          {
            amount: "2 000 000 €",
            description: fr ? "(capital propre)" : "(equity)",
          },
        ],
      },
    },
    after: {
      bank: {
        assets: [
          {
            amount: "1 200 000 €",
            description: fr
              ? "(toutes les créances sur les clients, dont celle de Nicolas QuiPaye)"
              : "(all claims on customers, including that of Nicolas QuiPaye)",
          },
          {
            amount: "1 800 000 €",
            description: fr ? "(Réserves M0)" : "(M0 Reserves)",
            hasChanged: true,
          },
        ],
        liabilities: [
          {
            amount: "1 000 000 €",
            description: fr
              ? "(tous les dépôts correspondants sur les comptes des clients sauf Nicolas QuiPaye, qui a transféré son argent chez Mme Michu)"
              : "(all corresponding deposits in customers' accounts except Nicolas WhoPays, who transferred its money to Ms. Michu)",
          },
          {
            amount: "0 €",
            description: fr
              ? "(dette M0 envers la banque de Mme Michu)"
              : "(M0 debt to Ms. Michu's bank)",
            hasChanged: true,
          },
          {
            amount: "2 000 000 €",
            description: fr ? "(capital propre)" : "(equity)",
          },
        ],
      },
    },
  };
};
