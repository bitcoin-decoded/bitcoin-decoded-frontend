/** Bank scenario data - Nicolas sends $1,000 to Ms. Michu */
export const BANK = {
  nicolasBefore: 2500,
  nicolasAfter: 1500,
  michuBefore: 800,
  michuAfter: 1800,
  sent: 1000,
} as const;

/** Bitcoin scenario data - Nicolas spends 2 UTXOs, sends 1.3 BTC to Ms. Michu */
export const BTC = {
  utxo1: 0.8,
  utxo2: 1.0,
  sentToMichu: 1.3,
  changeToNicolas: 0.4999,
  fees: 0.0001,
} as const;
