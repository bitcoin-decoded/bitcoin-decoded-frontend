import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { type StoredChapterProgress, useUserData } from "../../../UserData";
import {
  getArrivalAnchor,
  getChapterState,
  prefersReducedMotion,
  readLastVisitedBlock,
  smoothScrollTo,
} from "../helpers";
import type { ReadingProgress, RevealPhase } from "../types";

type Options = {
  chapterId: string;
  blockCount: number;
  badgeEarned: boolean;
};

type Reveal = { index: number; phase: RevealPhase };

const REVEAL_SCROLL_MS = 750;
const HEADER_OFFSET_PX = 104;

// Turns the persisted snapshot into runtime state: a snapshot saved against a
// different block count (chapter re-split since) is dropped, the rest clamped
// into range. The read/write source is the user-data store, not localStorage.
const normalizeStored = (
  stored: StoredChapterProgress | undefined,
  blockCount: number,
): ReadingProgress | null => {
  if (!stored || stored.blockCount !== blockCount) return null;
  const clamp = (n: number) => Math.max(0, Math.min(blockCount - 1, Math.floor(n)));
  const lastVisitedBlock = readLastVisitedBlock({
    maxRevealed: stored.maxRevealed,
    current: stored.current,
    done: stored.done,
    finished: stored.finished,
    lastVisitedBlock: stored.lastVisitedBlock,
  });
  return {
    maxRevealed: clamp(stored.maxRevealed),
    current: clamp(stored.current),
    done: stored.done,
    finished: stored.finished,
    lastVisitedBlock: lastVisitedBlock === null ? null : clamp(lastVisitedBlock),
  };
};

export const useBlockReader = ({ chapterId, blockCount, badgeEarned }: Options) => {
  const lastIndex = Math.max(0, blockCount - 1);
  const { getChapterReading, saveChapterReading } = useUserData();
  const restored = useMemo(
    () => normalizeStored(getChapterReading(chapterId), blockCount),
    [chapterId, blockCount, getChapterReading],
  );

  const [maxRevealed, setMaxRevealed] = useState(() => restored?.maxRevealed ?? 0);
  const [current, setCurrent] = useState(() => restored?.current ?? 0);
  const [done, setDone] = useState<number[]>(() => restored?.done ?? []);
  const [finished, setFinished] = useState(() => restored?.finished ?? false);
  const [lastVisitedBlock, setLastVisitedBlock] = useState<number | null>(
    () => restored?.lastVisitedBlock ?? null,
  );

  const [reveal, setReveal] = useState<Reveal | null>(null);
  const revealRef = useRef<Reveal | null>(null);
  const setRevealState = useCallback((next: Reveal | null) => {
    revealRef.current = next;
    setReveal(next);
  }, []);

  const hasProgress = lastVisitedBlock !== null || maxRevealed > 0 || done.length > 0 || finished;
  useEffect(() => {
    if (!hasProgress) return;
    saveChapterReading(chapterId, {
      maxRevealed,
      current,
      done,
      finished,
      lastVisitedBlock,
      blockCount,
    });
  }, [
    chapterId,
    maxRevealed,
    current,
    done,
    finished,
    blockCount,
    lastVisitedBlock,
    hasProgress,
    saveChapterReading,
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const blockEl = useCallback(
    (index: number): Element | null =>
      containerRef.current?.querySelector(`[data-block="${index}"]`) ?? null,
    [],
  );
  const scrollToBlock = useCallback(
    (index: number, behavior?: ScrollBehavior) => {
      blockEl(index)?.scrollIntoView({
        behavior: behavior ?? (prefersReducedMotion() ? "auto" : "smooth"),
        block: "start",
      });
    },
    [blockEl],
  );

  const arrival = useRef(
    getArrivalAnchor(getChapterState({ badgeEarned, lastVisitedBlock }), lastVisitedBlock),
  );

  const anchored = useRef(false);
  useEffect(() => {
    if (anchored.current) return;
    anchored.current = true;

    const applyAnchor = () => {
      const target = arrival.current;
      if (target.type === "block") {
        scrollToBlock(target.index, "instant");
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    applyAnchor();
    if (document.readyState !== "complete") {
      window.addEventListener("load", applyAnchor, { once: true });
    }
  }, [scrollToBlock]);

  const previousBlock = useRef(current);
  useEffect(() => {
    if (previousBlock.current === current) return;
    previousBlock.current = current;
    if (revealRef.current?.index === current) return;
    scrollToBlock(current);
  }, [current, scrollToBlock]);

  useEffect(() => {
    if (!reveal || reveal.phase !== "arriving") return;
    const el = blockEl(reveal.index);
    if (!el) return;
    smoothScrollTo(el, REVEAL_SCROLL_MS, HEADER_OFFSET_PX);
    const timer = window.setTimeout(() => {
      if (revealRef.current?.index === reveal.index) {
        setRevealState({ index: reveal.index, phase: "playing" });
      }
    }, REVEAL_SCROLL_MS);
    return () => window.clearTimeout(timer);
  }, [reveal, blockEl, setRevealState]);

  const isDone = useCallback((index: number) => done.includes(index), [done]);

  const markDone = useCallback((index: number) => {
    setDone((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }, []);

  const markCompleteFns = useMemo(
    () => Array.from({ length: blockCount }, (_, i) => () => markDone(i)),
    [blockCount, markDone],
  );

  const advance = useCallback(() => {
    const next = Math.min(lastIndex, current + 1);
    const isNew = next > maxRevealed;
    setCurrent(next);
    setLastVisitedBlock(next);
    setMaxRevealed((max) => Math.max(max, next));
    setRevealState(isNew && !prefersReducedMotion() ? { index: next, phase: "arriving" } : null);
  }, [current, lastIndex, maxRevealed, setRevealState]);

  const back = useCallback(() => {
    setRevealState(null);
    setCurrent((prev) => {
      const next = Math.max(0, prev - 1);
      setLastVisitedBlock(next);
      return next;
    });
  }, [setRevealState]);

  const jump = useCallback(
    (index: number) => {
      if (index >= 0 && index <= maxRevealed) {
        setRevealState(null);
        setCurrent(index);
        setLastVisitedBlock(index);
        scrollToBlock(index);
      }
    },
    [maxRevealed, scrollToBlock, setRevealState],
  );

  const finish = useCallback(() => {
    setMaxRevealed(lastIndex);
    setLastVisitedBlock(lastIndex);
    setFinished(true);
  }, [lastIndex]);

  const replay = useCallback(() => {
    setMaxRevealed(0);
    setCurrent(0);
    setLastVisitedBlock(0);
    setDone([]);
    setFinished(false);
    setRevealState(null);
  }, [setRevealState]);

  const getRevealPhase = useCallback(
    (index: number): RevealPhase | null => (reveal?.index === index ? reveal.phase : null),
    [reveal],
  );

  return {
    containerRef,
    maxRevealed,
    current,
    finished,
    getRevealPhase,
    isDone,
    markCompleteFns,
    advance,
    back,
    jump,
    finish,
    replay,
  };
};
