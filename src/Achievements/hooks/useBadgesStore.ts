import { useCallback, useEffect, useRef, useState } from "react";

import { BADGES } from "../data";
import type { Badge, EarnedBadges } from "../types";

const STORAGE_KEY = "bd:badges";
const BADGE_BY_ID = new Map(BADGES.map((b) => [b.id, b] as const));

// Mirrors the try/catch + validation discipline of useSynthesisQuiz / useBlockReader.
const readEarned = (): EarnedBadges => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || typeof parsed !== "object") return {};
    const out: EarnedBadges = {};
    for (const [id, at] of Object.entries(parsed as Record<string, unknown>)) {
      // Drop unknown ids (catalog edits) and malformed timestamps.
      if (typeof at === "number" && BADGE_BY_ID.has(id)) out[id] = at;
    }
    return out;
  } catch {
    return {};
  }
};

export type BadgesStore = {
  earned: EarnedBadges;
  isEarned: (id: string) => boolean;
  earnedCount: number;
  totalCount: number;
  /** Idempotent: grants the badge once ever; first grant enqueues a celebration. */
  award: (id: string) => void;
  /** The badge currently being celebrated (head of the queue), or null. */
  celebration: Badge | null;
  dismissCelebration: () => void;
};

export const useBadgesStore = (): BadgesStore => {
  const [earned, setEarned] = useState<EarnedBadges>(readEarned);
  const [queue, setQueue] = useState<string[]>([]);

  const earnedRef = useRef(earned);
  earnedRef.current = earned;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(earned));
    } catch {
      // storage full or unavailable - silently ignore
    }
  }, [earned]);

  const award = useCallback((id: string) => {
    if (!BADGE_BY_ID.has(id)) return; // not a real badge (e.g. a chapter with no badge)
    if (earnedRef.current[id]) return; // already earned - no re-grant, no re-celebration
    setEarned((prev) => (prev[id] ? prev : { ...prev, [id]: Date.now() }));
    setQueue((q) => (q.includes(id) ? q : [...q, id]));
  }, []);

  const dismissCelebration = useCallback(() => setQueue((q) => q.slice(1)), []);

  const isEarned = useCallback((id: string) => Boolean(earned[id]), [earned]);

  return {
    earned,
    isEarned,
    earnedCount: Object.keys(earned).length,
    totalCount: BADGES.length,
    award,
    celebration: queue.length > 0 ? (BADGE_BY_ID.get(queue[0]) ?? null) : null,
    dismissCelebration,
  };
};
