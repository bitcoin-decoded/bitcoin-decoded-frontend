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
              ? "(tous les dépôts des créances sur les comptes des clients sauf Nicolas QuiPaye, qui a transféré l'argent chez Mme Michu)"
              : "(all claim deposits on customer accounts except Nicolas WhoPays, who transferred the money to Ms. Michu)",
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
              ? "(toutes les créances auprès des clients incluant celle de Nicolas QuiPaye)"
              : "(all claims from customers including Nicolas WhoPays)",
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
              ? "(tous les dépôts des créances sur les comptes des clients sauf Nicolas QuiPaye, qui a transféré l'argent chez Mme Michu)"
              : "(all claim deposits on customer accounts except Nicolas WhoPays, who transferred the money to Ms. Michu)",
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
