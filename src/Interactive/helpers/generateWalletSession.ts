import type { WalletCardData, WalletGameSession, WalletUtxo } from "../types";

const HEX = "0123456789abcdef";
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BECH32 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

const pick = (chars: string, len: number) => {
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
};

/** WIF-like private key. Starts with K or L (matches a real compressed-WIF prefix) */
const randomPrivateKey = () => `${Math.random() < 0.5 ? "K" : "L"}${pick(BASE58, 51)}`;

/** Compressed public key - 33 bytes hex, starts with 02 or 03. */
const randomPublicKey = () => `${Math.random() < 0.5 ? "02" : "03"}${pick(HEX, 64)}`;

/** Bech32 P2WPKH address (bc1q…), ~42 chars total. */
const randomAddress = () => `bc1q${pick(BECH32, 38)}`;

/** Round to 2 decimals - keeps the mental-arithmetic challenge tractable. */
const round2 = (n: number) => Math.round(n * 100) / 100;

/** Random plausible UTXO amount, 0.05–0.55 BTC, rounded to 2 decimals. */
const randomUtxoAmount = () => round2(0.05 + Math.random() * 0.5);

/**
 * Build one game session: 3 cards, exactly one of which holds 2-4 UTXOs.
 * The funded card position and amounts are randomized.
 */
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
