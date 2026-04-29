/** Bank scenario data — Alice sends €1,000 to Bob */
export const BANK = {
  aliceBefore: 2500,
  aliceAfter: 1500,
  bobBefore: 800,
  bobAfter: 1800,
  sent: 1000,
} as const;

/** Bitcoin scenario data — Alice spends 2 UTXOs, sends 1.3 BTC to Bob */
export const BTC = {
  utxo1: 0.8,
  utxo2: 1.0,
  sentToBob: 1.3,
  changeToAlice: 0.4999,
  fees: 0.0001,
} as const;
