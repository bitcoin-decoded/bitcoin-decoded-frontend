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
 *  Audit initial : Q1 2025, ère post-halving avril 2024
 *  (subvention 3.125 BTC, prochain halving prévu printemps 2028).
 *  À ré-auditer à chaque halving et au minimum tous les 12 mois.
 *
 * ──────────────────────────────────────────────────────────────────────
 * COHÉRENCE INTERNE
 * ──────────────────────────────────────────────────────────────────────
 *  Pour éviter la désynchronisation que ce référentiel doit éliminer :
 *  les valeurs CORRÉLÉES sont calées sur deux sources externes et la
 *  troisième est DÉRIVÉE par calcul (commenté en regard).
 *  Exemple : frais/bloc + tx/bloc sourcés → frais/tx = frais/bloc ÷ tx/bloc.
 */
// ──────────────────────────────────────────────────────────────────────
// HELPER : subvention courante dérivée du calendrier protocolaire
// ──────────────────────────────────────────────────────────────────────

import { currentBlockSubsidyBTC } from "../helpers";

/**
 * Subvention par bloc en vigueur à une année donnée. Choisit le dernier
 * halving dont l'année est ≤ `year`. Si `year` précède le bloc genesis,
 * retombe sur l'époque 50 BTC.
 *
 * Le programme d'émission est protocolaire et non négociable, donc
 * cette dérivation est exacte par construction. Centralisée ici pour
 * que les composants ne re-implémentent pas la logique.
 */

// ──────────────────────────────────────────────────────────────────────
// BITCOIN_REFERENCE_VALUES
// ──────────────────────────────────────────────────────────────────────

// Constantes amont (sourcées). Mises à jour ici, les dérivées (frais/tx,
// tx/s) se recalent automatiquement — c'est précisément la garantie de
// cohérence interne que le référentiel doit offrir.
const _AVG_BLOCK_FEES_BTC = 0.08;
const _AVG_TX_PER_BLOCK = 3000;
const _BLOCK_TIME_MIN = 10;

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
  BLOCK_TIME_MIN: _BLOCK_TIME_MIN,

  /**
   * Plafond d'émission monétaire.
   * Source : Bitcoin protocol (limite asymptotique de l'émission).
   */
  TOTAL_SUPPLY_BTC: 21_000_000,

  // ── Flux frais — SOURCÉS ──────────────────────────────────────────
  // Les deux entrées suivantes sont calées sur des sources externes ;
  // `AVERAGE_TX_FEE_BTC` plus bas en est DÉRIVÉE pour garantir la
  // cohérence interne du référentiel.

  /**
   * Frais cumulés moyens par bloc, période calme post-halving 2024.
   * Fourchette typique : 0.03–0.20 BTC selon congestion mempool.
   * Médiane retenue (lisibilité pédagogique).
   * Source : mempool.space → Mining → Block fees stats (médiane mobile
   * 7 jours, hors pics ordinals).
   * [À VÉRIFIER au moment de chaque commit qui consomme cette valeur]
   */
  AVERAGE_BLOCK_FEES_BTC: _AVG_BLOCK_FEES_BTC,

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
   * Nombre moyen de transactions par bloc, période calme.
   * Fourchette : 2 500–4 000. Médiane retenue.
   * Source : mempool.space, blockchain.com/charts/n-transactions-per-block.
   * [À VÉRIFIER]
   */
  AVERAGE_TX_PER_BLOCK: _AVG_TX_PER_BLOCK,

  // ── Flux frais — DÉRIVÉ ───────────────────────────────────────────

  /**
   * Frais moyens par transaction L1 en période calme.
   *
   * DÉRIVÉ : AVERAGE_BLOCK_FEES_BTC / AVERAGE_TX_PER_BLOCK
   *        = 0.08 / 3 000
   *        ≈ 0.0000267 BTC ≈ 2 667 sats
   *
   * On ne sait pas calibrer indépendamment frais/bloc, tx/bloc et
   * frais/tx sans introduire une incohérence — donc on en source deux
   * et on dérive la troisième. Ordre de grandeur corroborant : ~2-10
   * sats/vB sur une tx SegWit ~250-400 vB en période calme.
   * Source de cohérence : mempool.space (les deux valeurs amont).
   */
  AVERAGE_TX_FEE_BTC: _AVG_BLOCK_FEES_BTC / _AVG_TX_PER_BLOCK,

  // ── Photographie réseau ───────────────────────────────────────────

  /**
   * Hashrate global du réseau, Q1 2025.
   * Fourchette : 700–900 EH/s (forte variabilité saisonnière, croît
   * ~+30 %/an en tendance longue).
   * Source : mempool.space → Mining → Hashrate, blockchain.com/charts/hash-rate.
   * [À VÉRIFIER]
   */
  NETWORK_HASHRATE_EH: 800,

  /**
   * Capitalisation indicative en milliards de dollars.
   *
   * Photographie : Q1 2025 — prix BTC ~$80k, supply ~19.8 M ⇒ ~$1.58 T.
   * Fourchette plausible sur le cycle 2024–2026 : $1 200–2 200 Md
   * (le prix BTC oscille typiquement entre $60k et $130k sur la période,
   * la supply croît lentement de ~0.85 %/an).
   *
   * Source : CoinMetrics, CoinGecko, blockchain.com/charts/market-cap.
   *
   * [À VÉRIFIER] Chiffre extrêmement volatil — les composants qui le
   * consomment DOIVENT afficher la date de référence côté UI pour
   * absorber les écarts perçus par le lecteur (ex. « ordre de grandeur
   * 2025 »).
   */
  MARKET_CAP_USD_BILLIONS: 1500,

  /**
   * Débit moyen Bitcoin L1 en transactions par seconde.
   *
   * DÉRIVÉ : AVERAGE_TX_PER_BLOCK / (BLOCK_TIME_MIN × 60)
   *        = 3 000 / 600 = 5 tx/s
   *
   * Fourchette observée : 3–7 tx/s selon période.
   * Source de cohérence : AVERAGE_TX_PER_BLOCK ÷ temps de bloc.
   * Source externe corroborante : blockchain.com → n-transactions-per-second.
   */
  AVERAGE_TX_PER_SECOND: _AVG_TX_PER_BLOCK / (_BLOCK_TIME_MIN * 60),
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
   * Masse monétaire mondiale agrégée (M2 / quasi-M2), estimation 2024.
   *
   * Définition NON standardisée internationalement — la valeur précise
   * dépend des agrégats nationaux retenus et du périmètre (M2 strict
   * vs « broad money »). Fourchette consensuelle 80–110 T$ équivalents
   * selon agrégation.
   *
   * Les composants pédagogiques qui consomment cette valeur devraient
   * afficher la fourchette plutôt qu'un point précis, ou contextualiser
   * « ordre de grandeur ».
   *
   * Sources convergentes : BIS Quarterly Review, McKinsey Global
   * Institute, Visual Capitalist (agrégation non-officielle).
   * [À VÉRIFIER : agrégation hétérogène — médiane retenue à titre
   * indicatif uniquement]
   */
  GLOBAL_M2_USD_TRILLIONS: 95,
  /** Fourchette consensuelle associée à `GLOBAL_M2_USD_TRILLIONS`. */
  GLOBAL_M2_USD_TRILLIONS_RANGE: [80, 110] as const,
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
