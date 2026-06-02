import { useEffect, useRef, useState } from "react";

import { BITCOIN_REFS } from "../../../References";
import { TIME_MACHINE_MAX_YEAR } from "../data";
import { getRewardForYear, isSubsidySymbolic } from "../helpers";
import type { TravelPhase } from "../types";

const GENESIS = BITCOIN_REFS.HALVING_SCHEDULE[0];
const MIN_YEAR = GENESIS.year;
const MAX_YEAR = TIME_MACHINE_MAX_YEAR;
const TRAVEL_MS = 1300;
const SCRAMBLE_MS = 70;

const clampYear = (year: number) => Math.min(MAX_YEAR, Math.max(MIN_YEAR, Math.round(year)));

/**
 * Drives the halving time machine: the user dials a `targetYear`, then pulls the
 * lever (`travel`) to be propelled there. While traveling, `displayYear`
 * scrambles for a flux effect; on arrival it locks to the target and the reward
 * for that year is revealed. Honors prefers-reduced-motion by jumping instantly.
 */
export const useHalvingTimeMachine = () => {
  const [targetYear, setTargetYearState] = useState(() => clampYear(new Date().getFullYear()));
  const [displayYear, setDisplayYear] = useState(targetYear);
  const [arrivedYear, setArrivedYear] = useState<number | null>(null);
  const [phase, setPhase] = useState<TravelPhase>("idle");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const arrive = (year: number) => {
    setDisplayYear(year);
    setArrivedYear(year);
    setPhase("arrived");
  };

  const setTargetYear = (next: number) => {
    if (phase === "traveling") return;
    setTargetYearState(clampYear(next));
  };

  const travel = () => {
    if (phase === "traveling") return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      arrive(targetYear);
      return;
    }

    setPhase("traveling");
    clearTimers();
    intervalRef.current = setInterval(() => {
      setDisplayYear(MIN_YEAR + Math.floor(Math.random() * (MAX_YEAR - MIN_YEAR + 1)));
    }, SCRAMBLE_MS);
    timeoutRef.current = setTimeout(() => {
      clearTimers();
      arrive(targetYear);
    }, TRAVEL_MS);
  };

  const reward = arrivedYear !== null ? getRewardForYear(arrivedYear) : null;
  const isExhausted = reward === 0;
  const isGenesisEra = reward === GENESIS.reward;
  const subsidySymbolic = reward !== null && isSubsidySymbolic(reward);

  return {
    minYear: MIN_YEAR,
    maxYear: MAX_YEAR,
    targetYear,
    displayYear,
    arrivedYear,
    phase,
    reward,
    isGenesisEra,
    isSubsidySymbolic: subsidySymbolic,
    isExhausted,
    setTargetYear,
    travel,
  };
};
