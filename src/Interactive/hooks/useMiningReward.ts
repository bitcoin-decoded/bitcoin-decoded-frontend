import { useCallback, useState } from "react";

import { BITCOIN_REFERENCE_VALUES } from "../data";

export type MiningRewardTx = {
  id: number;
  from: string;
  to: string;
  amount: number; // BTC
  fee: number; // BTC
};

export type MiningRewardBlockHeader = {
  height: number;
  prevHash: string;
  merkleRoot: string;
  timestamp: string;
  nonce: string;
};

const BLOCK_HEADER: MiningRewardBlockHeader = {
  height: 1_050_000,
  prevHash: "00000def…a9c3",
  merkleRoot: "a4e92c11…7d1b",
  timestamp: "2026",
  nonce: "18734",
};

/**
 * [PÉDAGOGIQUE] Échantillon de 4 transactions affichées pour rendre
 * concret le contenu d'un bloc. Un bloc réel en contient ~3 000 (cf.
 * `BITCOIN_REFERENCE_VALUES.AVERAGE_TX_PER_BLOCK`).
 *
 * Les frais individuels sont des ordres de grandeur plausibles pour
 * des tx routinières (~2-10 sats/vB sur des tx 200-400 vB). Leur somme
 * ne reflète PAS le total des frais du bloc — celui-ci provient du
 * référentiel (`AVERAGE_BLOCK_FEES_BTC`, 0.08 BTC) qui couvre les
 * ~3 000 tx du bloc complet. Le composant explicite cette distinction
 * via le label "Frais (bloc complet)" dans le panneau de récompense.
 */
const TRANSACTIONS: readonly MiningRewardTx[] = [
  { id: 1, from: "Marc", to: "Léa", amount: 0.5, fee: 0.00012 },
  { id: 2, from: "Nicolas", to: "Michu", amount: 0.1, fee: 0.00025 },
  { id: 3, from: "Carlos", to: "Diana", amount: 0.08, fee: 0.00008 },
  { id: 4, from: "Éric", to: "Fatima", amount: 3.0, fee: 0.0004 },
];

// Rounding helper - floats can produce 3.12584999... due to IEEE-754
const round = (btc: number, decimals = 8): number =>
  Math.round(btc * 10 ** decimals) / 10 ** decimals;

export const useMiningReward = () => {
  const [rewarded, setRewarded] = useState(false);

  // Subvention et frais cumulés viennent du référentiel partagé. La
  // subvention est protocolaire (auto-met à jour aux halvings). Les
  // frais cumulés représentent le BLOC ENTIER, pas la somme des 4 tx
  // affichées (cf. commentaire [PÉDAGOGIQUE] sur TRANSACTIONS).
  const subsidy = BITCOIN_REFERENCE_VALUES.BLOCK_SUBSIDY_BTC;
  const totalFees = round(BITCOIN_REFERENCE_VALUES.AVERAGE_BLOCK_FEES_BTC);
  const totalReward = round(subsidy + totalFees);
  const minerBalance = rewarded ? totalReward : 0;

  const reward = useCallback(() => setRewarded(true), []);
  const reset = useCallback(() => setRewarded(false), []);

  return {
    blockHeader: BLOCK_HEADER,
    transactions: TRANSACTIONS,
    subsidy,
    totalFees,
    totalReward,
    minerBalance,
    rewarded,
    reward,
    reset,
  };
};
