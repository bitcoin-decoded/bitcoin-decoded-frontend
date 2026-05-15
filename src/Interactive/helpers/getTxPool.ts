import type { Language } from "../../I18n";
import type { MempoolTransaction } from "../types";

export const getTxPool = (language: Language): MempoolTransaction[] => {
  const fr = language === "fr";
  return [
    { id: 1, from: "Marc", to: fr ? "Léa" : "Lea", amount: "0.5 BTC" },
    { id: 2, from: "Carlos", to: "Diana", amount: "0.12 BTC" },
    { id: 3, from: "Nicolas", to: "Michu", amount: "0.1 BTC", conflictGroup: 1 },
    { id: 4, from: fr ? "Éric" : "Eric", to: "Fatima", amount: "0.03 BTC" },
    { id: 5, from: "Nicolas", to: "Christine L.", amount: "0.1 BTC", conflictGroup: 1 },
    { id: 6, from: "Grace", to: "Hiro", amount: "2.4 BTC" },
  ];
};
