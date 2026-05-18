import type { WalletCardData } from "./WalletCardData";

export type WalletGameSession = {
  cards: WalletCardData[];
  fundedCardId: number;
  totalAmount: number;
};
