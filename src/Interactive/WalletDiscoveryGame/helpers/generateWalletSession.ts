import type { WalletCardData, WalletGameSession, WalletUtxo } from "../types";

import { randomAddress } from "./randomAddress";
import { randomPrivateKey } from "./randomPrivateKey";
import { randomPublicKey } from "./randomPublicKey";
import { randomUtxoAmount } from "./randomUtxoAmount";
import { round2 } from "./round2";

export const generateWalletSession = (): WalletGameSession => {
  const fundedCardId = Math.floor(Math.random() * 3);
  const utxoCount = 2 + Math.floor(Math.random() * 3); // 2..4

  const cards: WalletCardData[] = Array.from({ length: 3 }, (_, id) => {
    const utxos: WalletUtxo[] =
      id === fundedCardId
        ? Array.from({ length: utxoCount }, (_, i) => ({
            id: `utxo-${id}-${i}-${Math.random().toString(36).slice(2, 8)}`,
            amount: randomUtxoAmount(),
          }))
        : [];
    return {
      id,
      privateKey: randomPrivateKey(),
      publicKey: randomPublicKey(),
      address: randomAddress(),
      utxos,
    };
  });

  const totalAmount = round2(cards[fundedCardId].utxos.reduce((sum, u) => sum + u.amount, 0));

  return { cards, fundedCardId, totalAmount };
};
