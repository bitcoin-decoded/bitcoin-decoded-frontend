import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { prefersReducedMotion } from "../helpers";
import type { ReadingProgress } from "../types";

type Options = {
  chapterId: string;
  blockCount: number;
};

// localStorage persistence mirrors src/Interactive/SynthesisQuiz/hooks/useSynthesisQuiz.ts:
// same try/catch discipline, plus a blockCount guard so a content edit (different
// number of blocks) cleanly resets instead of resuming at a stale index.
const storageKey = (chapterId: string) => `bd:reading:${chapterId}`;

const readProgress = (chapterId: string, blockCount: number): ReadingProgress | null => {
  try {
    const raw = localStorage.getItem(storageKey(chapterId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ReadingProgress> & { blockCount?: number };
    if (
      typeof parsed.maxRevealed !== "number" ||
      typeof parsed.current !== "number" ||
      typeof parsed.finished !== "boolean" ||
      !Array.isArray(parsed.done) ||
      parsed.blockCount !== blockCount
    ) {
      return null;
    }
    const clamp = (n: number) => Math.max(0, Math.min(blockCount - 1, Math.floor(n)));
    return {
      maxRevealed: clamp(parsed.maxRevealed),
      current: clamp(parsed.current),
      done: parsed.done.filter((d): d is number => typeof d === "number"),
      finished: parsed.finished,
    };
  } catch {
    return null;
  }
};

/**
 * The reading engine's single state owner: progress (current / maxRevealed /
 * done / finished, persisted), the view orchestration (which block animates,
 * the completion celebration), and the scroll anchoring. `BlockReader` stays a
 * dumb component that consumes this and renders.
 */
export const useBlockReader = ({ chapterId, blockCount }: Options) => {
  const lastIndex = Math.max(0, blockCount - 1);
  const restored = useMemo(() => readProgress(chapterId, blockCount), [chapterId, blockCount]);

  const [maxRevealed, setMaxRevealed] = useState(() => restored?.maxRevealed ?? 0);
  const [current, setCurrent] = useState(() => restored?.current ?? 0);
  const [done, setDone] = useState<number[]>(() => restored?.done ?? []);
  const [finished, setFinished] = useState(() => restored?.finished ?? false);
  // Block (and its incoming chain link) that just crossed the reveal frontier.
  const [revealingIndex, setRevealingIndex] = useState(() => restored?.current ?? 0);

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey(chapterId),
        JSON.stringify({ maxRevealed, current, done, finished, blockCount }),
      );
    } catch {
      // storage full or unavailable — silently ignore
    }
  }, [chapterId, maxRevealed, current, done, finished, blockCount]);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToBlock = useCallback((index: number) => {
    const el = containerRef.current?.querySelector(`[data-block="${index}"]`);
    el?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const prevMax = useRef(maxRevealed);
  useEffect(() => {
    if (maxRevealed > prevMax.current) setRevealingIndex(maxRevealed);
    prevMax.current = maxRevealed;
  }, [maxRevealed]);

  // Smooth-scroll to the focused block on navigation (not on first paint).
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    scrollToBlock(current);
  }, [current, scrollToBlock]);

  const isDone = useCallback((index: number) => done.includes(index), [done]);

  const markDone = useCallback((index: number) => {
    setDone((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }, []);

  // Stable per-block completion callbacks for tool blocks (markDone is
  // idempotent, so a component firing it more than once is harmless).
  const markCompleteFns = useMemo(
    () => Array.from({ length: blockCount }, (_, i) => () => markDone(i)),
    [blockCount, markDone],
  );

  const advance = useCallback(() => {
    const next = Math.min(lastIndex, current + 1);
    setCurrent(next);
    setMaxRevealed((max) => Math.max(max, next));
  }, [current, lastIndex]);

  const back = useCallback(() => {
    setCurrent((prev) => Math.max(0, prev - 1));
  }, []);

  // Milestone jump — refocus AND scroll to a revealed block, even when it is
  // already current (a current-block click must still anchor).
  const jump = useCallback(
    (index: number) => {
      if (index >= 0 && index <= maxRevealed) {
        setCurrent(index);
        scrollToBlock(index);
      }
    },
    [maxRevealed, scrollToBlock],
  );

  // Completion is celebrated by the badge unlock overlay (awarded from
  // BlockReader on `finished`), so finishing just commits the terminal state.
  const finish = useCallback(() => {
    setMaxRevealed(lastIndex);
    setFinished(true);
  }, [lastIndex]);

  const replay = useCallback(() => {
    setMaxRevealed(0);
    setCurrent(0);
    setDone([]);
    setFinished(false);
    setRevealingIndex(0);
  }, []);

  return {
    containerRef,
    maxRevealed,
    current,
    finished,
    revealingIndex,
    isDone,
    markCompleteFns,
    advance,
    back,
    jump,
    finish,
    replay,
  };
};
