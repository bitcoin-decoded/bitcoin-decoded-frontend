import { useEffect, useRef, useState } from "react";

import { BITCOIN_REFS } from "../../../References";
import { TIME_MACHINE_MAX_YEAR } from "../data";
import { getRewardForYear, isSubsidySymbolic } from "../helpers";
import type { TravelPhase } from "../types";

const genesis = () => BITCOIN_REFS.HALVING_SCHEDULE[0];
const minYear = () => genesis().year;
const MAX_YEAR = TIME_MACHINE_MAX_YEAR;
const TRAVEL_MS = 1300;
const SCRAMBLE_MS = 70;

const clampYear = (year: number) => Math.min(MAX_YEAR, Math.max(minYear(), Math.round(year)));

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
      setDisplayYear(minYear() + Math.floor(Math.random() * (MAX_YEAR - minYear() + 1)));
    }, SCRAMBLE_MS);
    timeoutRef.current = setTimeout(() => {
      clearTimers();
      arrive(targetYear);
    }, TRAVEL_MS);
  };

  const reward = arrivedYear !== null ? getRewardForYear(arrivedYear) : null;
  const isExhausted = reward === 0;
  const isGenesisEra = reward === genesis().reward;
  const subsidySymbolic = reward !== null && isSubsidySymbolic(reward);

  return {
    minYear: minYear(),
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
