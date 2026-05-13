/**
 * ECONOMIC_REFERENCE — source de vérité unique pour les chiffres
 * économiques (Bitcoin + fiat) consommés par les composants
 * pédagogiques.
 *
 * ──────────────────────────────────────────────────────────────────────
 * RÈGLES
 * ──────────────────────────────────────────────────────────────────────
 *  1. Aucune valeur inventée. Chaque entrée porte un commentaire de
 *     source vérifiable (mempool.space, Glassnode, CoinMetrics,
 *     blockchain.com, FRED, ECB SDW…).
 *  2. Si une valeur ne peut pas être sourcée à la précision voulue,
 *     fourchette commentée + tag `[À VÉRIFIER]`.
 *  3. Les composants ne codent JAMAIS en dur les ordres de grandeur ;
 *     ils dérivent de ce fichier (avec une note `[PÉDAGOGIQUE]` si la
 *     valeur affichée s'écarte volontairement du référentiel pour la
 *     lisibilité).
 *
 * ──────────────────────────────────────────────────────────────────────
 * DATE D'AUDIT
 * ──────────────────────────────────────────────────────────────────────
 *  Audit initial : Q2 2026, ère post-halving avril 2024
 *  (subvention 3.125 BTC, prochain halving prévu printemps 2028).
 *  À ré-auditer à chaque halving et au minimum tous les 12 mois.
 */

import { HALVING_SCHEDULE } from "./HALVING_SCHEDULE";

// ──────────────────────────────────────────────────────────────────────
// HELPER : subvention courante dérivée du calendrier protocolaire
// ──────────────────────────────────────────────────────────────────────

/**
 * Subvention par bloc en vigueur à une année donnée. Choisit le dernier
 * halving dont l'année est ≤ `year`. Si `year` précède le bloc genesis,
 * retombe sur l'époque 50 BTC.
 *
 * Le programme d'émission est protocolaire et non négociable, donc
 * cette dérivation est exacte par construction. Centralisée ici pour
 * que les composants ne re-implémentent pas la logique.
 */
export const currentBlockSubsidyBTC = (
  year: number = new Date().getFullYear(),
): number => {
  const sorted = [...HALVING_SCHEDULE].sort((a, b) => b.year - a.year);
  return sorted.find((h) => h.year <= year)?.reward ?? sorted[sorted.length - 1].reward;
};

// ──────────────────────────────────────────────────────────────────────
// BITCOIN_REFERENCE_VALUES
// ──────────────────────────────────────────────────────────────────────

export const BITCOIN_REFERENCE_VALUES = {
  /**
   * Subvention par bloc en cours.
   * Dérivée du calendrier de halving — exacte par construction du
   * protocole. Auto-met à jour aux prochains halvings (Apr 2028, etc.).
   * Source : Bitcoin protocol (consensus rule).
   */
  BLOCK_SUBSIDY_BTC: currentBlockSubsidyBTC(),

  /**
   * Cible de temps entre deux blocs.
   * Protocole, ajusté par la difficulté toutes les 2016 blocs.
   * Source : Bitcoin protocol.
   */
  BLOCK_TIME_MIN: 10,

  /**
   * Plafond d'émission monétaire.
   * Source : Bitcoin protocol (limite asymptotique de l'émission).
   */
  TOTAL_SUPPLY_BTC: 21_000_000,

  /**
   * Frais cumulés moyens par bloc, période calme post-halving 2024.
   * Fourchette typique : 0.03–0.20 BTC selon congestion mempool.
   * Médiane retenue (lisibilité pédagogique).
   * Source : mempool.space → Mining → Block fees stats (médiane mobile
   * 7 jours, hors pics ordinals).
   * [À VÉRIFIER au moment de chaque commit qui consomme cette valeur]
   */
  AVERAGE_BLOCK_FEES_BTC: 0.08,

  /**
   * Frais cumulés par bloc en période de congestion soutenue (pic).
   * Sert de plafond plausible pour les démos qui matérialisent le
   * scénario « les frais prennent le relais de la subvention ».
   * Médiane des pics récents : ~1.0–2.0 BTC ; le halving Apr 2024 a
   * dépassé 5 BTC pendant quelques heures (vague ordinals/runes).
   * Source : mempool.space → Mining → Block fees historiques.
   * [À VÉRIFIER]
   */
  PEAK_BLOCK_FEES_BTC: 1.5,

  /**
   * Frais moyens par transaction L1 en période calme.
   * Une tx SegWit typique ~150–250 vB à 2–8 sats/vB ⇒ 300–2 000 sats.
   * Médiane retenue : 1 000 sats = 0.00001 BTC.
   * Source : mempool.space → mempool fee stats.
   * [À VÉRIFIER]
   */
  AVERAGE_TX_FEE_BTC: 0.00001,

  /**
   * Hashrate global du réseau, Q2 2026.
   * Fourchette : 700–900 EH/s (forte variabilité saisonnière, croît
   * ~+30 %/an en tendance longue).
   * Source : mempool.space → Mining → Hashrate, blockchain.com/charts/hash-rate.
   * [À VÉRIFIER]
   */
  NETWORK_HASHRATE_EH: 800,

  /**
   * Capitalisation indicative en milliards de dollars.
   * Très variable selon le cycle post-halving. Fourchette retenue pour
   * 2024–2026 : $1 200–2 000 Md. Valeur médiane pédagogique.
   * Source : CoinMetrics, CoinGecko, blockchain.com.
   * [À VÉRIFIER : à recaler à chaque audit ; chiffre extrêmement
   * volatil]
   */
  MARKET_CAP_USD_BILLIONS: 1500,

  /**
   * Débit moyen Bitcoin L1 en transactions par seconde.
   * 3–7 tx/s selon période. Cohérent avec ~300 tx/min, ~3 000 tx/bloc.
   * Source : blockchain.com → charts → n-transactions-per-second.
   * [À VÉRIFIER]
   */
  AVERAGE_TX_PER_SECOND: 5,

  /**
   * Nombre moyen de transactions par bloc, période calme.
   * Fourchette : 2 500–4 000. Médiane retenue.
   * Source : mempool.space, blockchain.com.
   * [À VÉRIFIER]
   */
  AVERAGE_TX_PER_BLOCK: 3000,
} as const;

// ──────────────────────────────────────────────────────────────────────
// FIAT_REFERENCE_VALUES
// ──────────────────────────────────────────────────────────────────────
// Masses monétaires fiat utilisées comme contraste à la rareté absolue
// de Bitcoin (ex. modules MoneyLaws, transitions Bitcoin5 / Bitcoin8).
// Valeurs en milliers de milliards d'unités de compte (T = trillion
// court états-unien = 10¹²).

export const FIAT_REFERENCE_VALUES = {
  /**
   * Masse monétaire M2 États-Unis, fin 2024 / début 2025.
   * Source : FRED (Federal Reserve Bank of St. Louis), série M2SL
   * (https://fred.stlouisfed.org/series/M2SL).
   * En milliers de milliards de dollars (T$).
   * [À VÉRIFIER]
   */
  US_M2_USD_TRILLIONS: 21.5,

  /**
   * Masse monétaire M2 zone euro, fin 2024 / début 2025.
   * Source : ECB Statistical Data Warehouse, série BSI.M.U2.Y.V.M20.X.
   * En milliers de milliards d'euros (T€).
   * [À VÉRIFIER]
   */
  EUR_M2_TRILLIONS: 15.5,

  /**
   * Masse monétaire mondiale agrégée (estimation), fin 2024.
   * Indicatif uniquement — agrégation hétérogène entre banques
   * centrales. Source : Visual Capitalist / All the World's Money.
   * En milliers de milliards de dollars équivalents.
   * [À VÉRIFIER : agrégation grossière]
   */
  GLOBAL_M2_USD_TRILLIONS: 95,
} as const;

// ──────────────────────────────────────────────────────────────────────
// Hors référentiel (cadrage)
// ──────────────────────────────────────────────────────────────────────
// Les montants USD du scénario bancaire pédagogique (cf. `BANK` dans
// `TRANSACTION_COMPARISON_DATA.ts` : Nicolas envoie $1 000 à Mme Michu)
// sont volontairement maintenus hors référentiel — ce sont des valeurs
// narratives, pas des chiffres économiques sourcés. Toute évolution
// pédagogique reste à leur charge propre.

export type BitcoinReferenceKey = keyof typeof BITCOIN_REFERENCE_VALUES;
export type FiatReferenceKey = keyof typeof FIAT_REFERENCE_VALUES;
