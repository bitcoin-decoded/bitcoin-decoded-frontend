export type WalletUtxo = {
  id: string;
  amount: number;
};

export type WalletCardData = {
  id: number;
  privateKey: string;
  publicKey: string;
  address: string;
  utxos: WalletUtxo[];
};

export type WalletGameStage = "idle" | "revealed" | "validated";

export type WalletGameVerdict = "correct" | "incorrect" | null;

export type WalletGameSession = {
  cards: WalletCardData[];
  fundedCardId: number;
  totalAmount: number;
};
