import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  /**
   * The chapter's badge — the one authority on completion. Deliberately not
   * `finished`, which only records that *this* reading pass was sealed and is
   * cleared by "Recommencer" while the badge stays earned.
   */
  badgeEarned: boolean;
};

type Reveal = { index: number; phase: RevealPhase };

// The mechanical scroll to the next block, then the content reveal. Long enough
// to read as a deliberate, automaton-like travel before the page composes.
const REVEAL_SCROLL_MS = 750;
// Sticky-header clearance, mirrors BlockShell's scrollMarginTop (6.5rem).
const HEADER_OFFSET_PX = 104;

// localStorage persistence mirrors src/Interactive/SynthesisQuiz/hooks/useSynthesisQuiz.ts:
// same try/catch discipline, plus a blockCount guard so a content edit (different
// number of blocks) cleanly resets instead of resuming at a stale index.
const storageKey = (chapterId: string) => `bd:reading:${chapterId}`;

const readProgress = (chapterId: string, blockCount: number): ReadingProgress | null => {
  try {
    const raw = localStorage.getItem(storageKey(chapterId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ReadingProgress> & {
      blockCount?: number;
      lastVisitedBlock?: number | null;
    };
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
    const lastVisitedBlock = readLastVisitedBlock({
      maxRevealed: parsed.maxRevealed,
      current: parsed.current,
      done: parsed.done.filter((d): d is number => typeof d === "number"),
      finished: parsed.finished,
      lastVisitedBlock: parsed.lastVisitedBlock,
    });
    return {
      maxRevealed: clamp(parsed.maxRevealed),
      current: clamp(parsed.current),
      done: parsed.done.filter((d): d is number => typeof d === "number"),
      finished: parsed.finished,
      lastVisitedBlock: lastVisitedBlock === null ? null : clamp(lastVisitedBlock),
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
export const useBlockReader = ({ chapterId, blockCount, badgeEarned }: Options) => {
  const lastIndex = Math.max(0, blockCount - 1);
  const restored = useMemo(() => readProgress(chapterId, blockCount), [chapterId, blockCount]);

  const [maxRevealed, setMaxRevealed] = useState(() => restored?.maxRevealed ?? 0);
  const [current, setCurrent] = useState(() => restored?.current ?? 0);
  const [done, setDone] = useState<number[]>(() => restored?.done ?? []);
  const [finished, setFinished] = useState(() => restored?.finished ?? false);
  // Set only when the reader *moves* between blocks — never by opening the
  // chapter. Null means never started, which is what tells State 1 from a
  // reader who walked back to block 01.
  const [lastVisitedBlock, setLastVisitedBlock] = useState<number | null>(
    () => restored?.lastVisitedBlock ?? null,
  );

  // The block currently performing its entrance, and its phase. Null on load
  // and whenever we move back / jump to an already-seen block (those just
  // focus + scroll, no animation). A ref mirror lets the scroll effects read it
  // synchronously without re-subscribing.
  const [reveal, setReveal] = useState<Reveal | null>(null);
  const revealRef = useRef<Reveal | null>(null);
  const setRevealState = useCallback((next: Reveal | null) => {
    revealRef.current = next;
    setReveal(next);
  }, []);

  // Writing on mount would create a record for a chapter merely opened, which
  // is exactly how "never started" used to become indistinguishable from
  // "sitting on block 01". Nothing is persisted until the reader has actually
  // done something.
  const hasProgress = lastVisitedBlock !== null || maxRevealed > 0 || done.length > 0 || finished;
  useEffect(() => {
    if (!hasProgress) return;
    try {
      localStorage.setItem(
        storageKey(chapterId),
        JSON.stringify({ maxRevealed, current, done, finished, blockCount, lastVisitedBlock }),
      );
    } catch {
      // storage full or unavailable - silently ignore
    }
  }, [chapterId, maxRevealed, current, done, finished, blockCount, lastVisitedBlock, hasProgress]);

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

  // Decided once, at first render, from the chapter's state — never from what
  // the router scrolled or the browser restored. The rules live in
  // `getChapterState` / `getArrivalAnchor`.
  const arrival = useRef(
    getArrivalAnchor(
      getChapterState({ badgeEarned, lastVisitedBlock }),
      lastVisitedBlock,
    ),
  );

  // Arrival: applied once, both branches, from the rule's output.
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
    // Safeguard for a cold load: an image above the anchor finishing late
    // shifts everything under it. Re-applying once the page is fully laid out
    // costs nothing and keeps the same decision on a settled document.
    if (document.readyState !== "complete") {
      window.addEventListener("load", applyAnchor, { once: true });
    }
  }, [scrollToBlock]);

  // Focus-scroll when the reader moves to another block. Guarded on the value
  // actually changing rather than on a "have I mounted" flag: StrictMode runs
  // effects twice in dev, and the old flag made that second run look like a
  // move, scrolling a freshly opened chapter down onto block 01.
  const previousBlock = useRef(current);
  useEffect(() => {
    if (previousBlock.current === current) return;
    previousBlock.current = current;
    // A fresh reveal owns its own (longer, mechanical) scroll.
    if (revealRef.current?.index === current) return;
    scrollToBlock(current);
  }, [current, scrollToBlock]);

  // A newly surfaced block: hold it hidden ("arriving"), mechanically scroll to
  // it, then flip to "playing" so its content composes in — no flash, and the
  // reveal never starts until the travel has finished.
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

  // Stable per-block completion callbacks for tool blocks (markDone is
  // idempotent, so a component firing it more than once is harmless).
  const markCompleteFns = useMemo(
    () => Array.from({ length: blockCount }, (_, i) => () => markDone(i)),
    [blockCount, markDone],
  );

  const advance = useCallback(() => {
    const next = Math.min(lastIndex, current + 1);
    // Only a block crossing the frontier for the first time gets the reveal;
    // advancing into an already-seen block just focuses + scrolls.
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

  // Milestone jump - refocus AND scroll to a revealed block, even when it is
  // already current (a current-block click must still anchor).
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

  // Completion is celebrated by the badge unlock overlay (awarded from
  // BlockReader on `finished`), so finishing just commits the terminal state.
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
