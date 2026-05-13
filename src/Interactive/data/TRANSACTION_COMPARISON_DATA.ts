import { BITCOIN_REFERENCE_VALUES } from "./ECONOMIC_REFERENCE";

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

// ── Bitcoin scenario ──────────────────────────────────────────────────
// Nicolas spends 2 UTXOs (narratifs), sends 1.3 BTC to Ms. Michu.
// Les frais sont branchés sur le référentiel (`AVERAGE_TX_FEE_BTC`)
// et le change est DÉRIVÉ par arithmétique pour que les valeurs
// affichées soient toujours cohérentes : inputs − sortie − frais = change.

const round5 = (n: number) => Math.round(n * 1e5) / 1e5;
const round8 = (n: number) => Math.round(n * 1e8) / 1e8;

const _utxo1 = 0.8;
const _utxo2 = 1.0;
const _sentToMichu = 1.3;
// [PÉDAGOGIQUE] Frais arrondis à 5 décimales (~3 000 sats) pour la
// lisibilité — même politique que `useUTXOBuilder.ts`.
const _fees = round5(BITCOIN_REFERENCE_VALUES.AVERAGE_TX_FEE_BTC);

export const BTC = {
  utxo1: _utxo1,
  utxo2: _utxo2,
  sentToMichu: _sentToMichu,
  fees: _fees,
  changeToNicolas: round8(_utxo1 + _utxo2 - _sentToMichu - _fees),
} as const;
