import type { WalletUtxo } from "./WalletUtxo";

export type WalletCardData = {
  id: number;
  privateKey: string;
  publicKey: string;
  address: string;
  utxos: WalletUtxo[];
};
