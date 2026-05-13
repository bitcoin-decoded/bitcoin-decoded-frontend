import { useState, useCallback, useRef, useEffect } from "react";

import { BITCOIN_REFERENCE_VALUES } from "../data";

export type FlywheelStepData = {
  id: number;
  labelKey: string;
  metricByLevel: readonly [string, string, string, string];
};

// ──────────────────────────────────────────────────────────────────────
// Calibration des 4 niveaux (lvl 0 → lvl 3)
// ──────────────────────────────────────────────────────────────────────
// L'objectif pédagogique du flywheel est de matérialiser la phrase
// « plus le réseau est utilisé, plus les frais prennent le relais de la
// subvention ». Pour que ce relais soit VISIBLE à l'œil il faut un
// ratio frais/subvention significatif au plus haut niveau — cible :
// ≥ 30-50 % au lvl 3.
//
// Les frais et la subvention sont dérivés du référentiel partagé
// `BITCOIN_REFERENCE_VALUES`. Les paliers intermédiaires (lvl 1 / lvl 2)
// sont choisis pour produire une rampe lisible :
//
//   Lvl 0 (calm)     fees = AVERAGE_BLOCK_FEES_BTC (0.08)  → ratio  2.5 %
//   Lvl 1 (warming)  fees = 0.25                          → ratio  8 %
//   Lvl 2 (active)   fees = 0.7                           → ratio 22 %
//   Lvl 3 (peak)     fees = PEAK_BLOCK_FEES_BTC (1.5)     → ratio 48 %
//
// Les `Security (EH/s)` et `Value sécurisée ($)` restent figés —
// leur lien dynamique sera traité en v2 (hors scope de cet audit).

const SUBSIDY = BITCOIN_REFERENCE_VALUES.BLOCK_SUBSIDY_BTC;
const AVG_FEES = BITCOIN_REFERENCE_VALUES.AVERAGE_BLOCK_FEES_BTC;
const PEAK_FEES = BITCOIN_REFERENCE_VALUES.PEAK_BLOCK_FEES_BTC;
const TX_PER_MIN = Math.round(BITCOIN_REFERENCE_VALUES.AVERAGE_TX_PER_SECOND * 60);

// Frais cumulés par bloc, par niveau. Lvl 0 et lvl 3 viennent
// directement du référentiel ; lvl 1 et lvl 2 sont des paliers
// pédagogiques pour rendre la rampe progressive.
const FEES_BTC_BY_LEVEL: readonly [number, number, number, number] = [
  AVG_FEES,
  0.25,
  0.7,
  PEAK_FEES,
];

// tx/min : ×1, ×2, ×4, ×8 du baseline 300 tx/min (≈ 5 tx/s).
// Le lvl 3 (~2 400 tx/min ≈ 40 tx/s attempted) modélise la DEMANDE en
// pic — au-delà du débit L1 soutenable (~5-7 tx/s) → la mempool
// déborde, ce qui justifie l'envolée des frais.
const TX_PER_MIN_BY_LEVEL: readonly [number, number, number, number] = [
  TX_PER_MIN,
  TX_PER_MIN * 2,
  TX_PER_MIN * 4,
  TX_PER_MIN * 8,
];

// Revenus mineurs = subvention + frais. Dérivé en bloc pour que la
// somme reste cohérente avec les deux lignes au-dessus.
const minerRev = (fees: number): number => SUBSIDY + fees;

const fmtBtc = (v: number, decimals = 3): string =>
  // Évite l'affichage d'IEEE-754 (0.7 → "0.6999999...") tout en gardant
  // un nombre de décimales utile pour les revenus mineurs (3.205, 4.625).
  `${parseFloat(v.toFixed(decimals))} BTC`;

const fmtTxMin = (n: number): string =>
  `${n.toLocaleString("fr-FR")} tx/min`;

const usageMetricByLevel: readonly [string, string, string, string] = [
  fmtTxMin(TX_PER_MIN_BY_LEVEL[0]),
  fmtTxMin(TX_PER_MIN_BY_LEVEL[1]),
  fmtTxMin(TX_PER_MIN_BY_LEVEL[2]),
  fmtTxMin(TX_PER_MIN_BY_LEVEL[3]),
];

const feesMetricByLevel: readonly [string, string, string, string] = [
  fmtBtc(FEES_BTC_BY_LEVEL[0], 2),
  fmtBtc(FEES_BTC_BY_LEVEL[1], 2),
  fmtBtc(FEES_BTC_BY_LEVEL[2], 2),
  fmtBtc(FEES_BTC_BY_LEVEL[3], 2),
];

const minersMetricByLevel: readonly [string, string, string, string] = [
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[0])),
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[1])),
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[2])),
  fmtBtc(minerRev(FEES_BTC_BY_LEVEL[3])),
];

export const FLYWHEEL_STEPS: readonly FlywheelStepData[] = [
  { id: 0, labelKey: "flywheel.step.usage",    metricByLevel: usageMetricByLevel },
  { id: 1, labelKey: "flywheel.step.fees",     metricByLevel: feesMetricByLevel },
  { id: 2, labelKey: "flywheel.step.miners",   metricByLevel: minersMetricByLevel },
  // ── Lignes 3 et 4 : INCHANGÉES (lien Security ↔ Value traité en v2) ──
  { id: 3, labelKey: "flywheel.step.security", metricByLevel: ["200 EH/s",    "350 EH/s",    "550 EH/s",    "800 EH/s"] },
  { id: 4, labelKey: "flywheel.step.value",    metricByLevel: ["$200B",       "$450B",       "$900B",       "$1 600B"] },
];

export const MAX_LEVEL = 3;
const STEP_DELAY_MS = 380;

export const useNetworkFlywheel = () => {
  const [level, setLevel] = useState(0);
  const [highlightedStep, setHighlightedStep] = useState(-1);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearPendingAnimations = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => () => clearPendingAnimations(), []);

  const increase = useCallback(() => {
    setLevel((prev) => {
      if (prev >= MAX_LEVEL) return prev;
      clearPendingAnimations();
      FLYWHEEL_STEPS.forEach((_, i) => {
        const t = setTimeout(() => setHighlightedStep(i), i * STEP_DELAY_MS);
        timeoutsRef.current.push(t);
      });
      const tEnd = setTimeout(
        () => setHighlightedStep(-1),
        FLYWHEEL_STEPS.length * STEP_DELAY_MS,
      );
      timeoutsRef.current.push(tEnd);
      return prev + 1;
    });
  }, []);

  const reset = useCallback(() => {
    clearPendingAnimations();
    setLevel(0);
    setHighlightedStep(-1);
  }, []);

  return {
    level,
    highlightedStep,
    steps: FLYWHEEL_STEPS,
    canIncrease: level < MAX_LEVEL,
    increase,
    reset,
  };
};
