/**
 * Bank scenario data - Nicolas sends $1,000 to Ms. Michu.
 *
 * Hors référentiel `ECONOMIC_REFERENCE` : ce sont des montants
 * narratifs (mise en scène du transfert bancaire), pas des chiffres
 * économiques sourcés. Toute évolution pédagogique reste à leur charge
 * propre.
 */
export const BANK = {
  nicolasBefore: 2500,
  nicolasAfter: 1500,
  michuBefore: 800,
  michuAfter: 1800,
  sent: 1000,
} as const;

/**
 * Bitcoin scenario data - Nicolas spends 2 UTXOs, sends 1.3 BTC to Ms. Michu.
 *
 * Les UTXOs (0.8 + 1.0) et le montant envoyé (1.3) sont narratifs ; les
 * frais (`fees`) en revanche sont un chiffre économique — à dériver
 * de `BITCOIN_REFERENCE_VALUES.AVERAGE_TX_FEE_BTC` en Phase 3.
 */
export const BTC = {
  utxo1: 0.8,
  utxo2: 1.0,
  sentToMichu: 1.3,
  changeToNicolas: 0.4999,
  fees: 0.0001,
} as const;
