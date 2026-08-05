import { describe, expect, it } from "vitest";

import { mergeProgress, type ProgressItem } from "./mergeProgress.js";

const item = (over: Partial<ProgressItem>): ProgressItem => ({
  itemId: "bitcoin-1",
  itemType: "chapter",
  status: "in_progress",
  score: null,
  data: null,
  ...over,
});

describe("mergeProgress", () => {
  it("keeps an incoming item when nothing is stored yet", () => {
    const incoming = item({ status: "completed" });
    expect(mergeProgress(null, incoming)).toEqual(incoming);
  });

  it("never lets a status regress", () => {
    const stored = item({ status: "completed" });
    const incoming = item({ status: "in_progress" });
    expect(mergeProgress(stored, incoming).status).toBe("completed");
  });

  it("advances a status that moves forward and takes its data", () => {
    const stored = item({ status: "in_progress", data: { maxRevealed: 2 } });
    const incoming = item({ status: "completed", data: { maxRevealed: 8 } });
    const merged = mergeProgress(stored, incoming);
    expect(merged.status).toBe("completed");
    expect(merged.data).toEqual({ maxRevealed: 8 });
  });

  it("keeps the maximum score", () => {
    expect(mergeProgress(item({ score: 12 }), item({ score: 9 })).score).toBe(12);
    expect(mergeProgress(item({ score: 9 }), item({ score: 12 })).score).toBe(12);
    expect(mergeProgress(item({ score: null }), item({ score: 7 })).score).toBe(7);
  });

  it("is independent of the order two devices write in", () => {
    const base = item({ status: "not_started", score: null });
    const a = item({ status: "completed", score: 15 });
    const b = item({ status: "in_progress", score: 18 });

    const ab = mergeProgress(mergeProgress(base, a), b);
    const ba = mergeProgress(mergeProgress(base, b), a);

    expect(ab.status).toBe(ba.status);
    expect(ab.score).toBe(ba.score);
    expect(ab.status).toBe("completed");
    expect(ab.score).toBe(18);
  });
});
