import { describe, expect, it } from "vitest";

import type { ProgressItem, StoredChapterProgress, UserData } from "../types";

import { fromProgressItems } from "./fromProgressItems";
import { toProgressItems } from "./toProgressItems";

const chapter = (over: Partial<StoredChapterProgress> = {}): StoredChapterProgress => ({
  maxRevealed: 4,
  current: 4,
  done: [0, 1, 2, 3],
  finished: false,
  lastVisitedBlock: 3,
  blockCount: 9,
  ...over,
});

describe("progress adapter", () => {
  it("round-trips badges and reading progress unchanged", () => {
    const data: UserData = {
      badges: { "bitcoin-1": 1000, "money-laws-2": 2000 },
      readingProgress: { "bitcoin-1": chapter({ finished: true }), "banking-2": chapter() },
    };
    expect(fromProgressItems(toProgressItems(data))).toEqual(data);
  });

  it("derives the chapter status from the reading state", () => {
    const items = toProgressItems({
      badges: {},
      readingProgress: {
        done: chapter({ finished: true }),
        started: chapter({ finished: false, maxRevealed: 2 }),
        untouched: chapter({ finished: false, maxRevealed: 0, current: 0 }),
      },
    });
    const status = (id: string) => items.find((i) => i.itemId === id)?.status;
    expect(status("done")).toBe("completed");
    expect(status("started")).toBe("in_progress");
    expect(status("untouched")).toBe("not_started");
  });

  it("ignores unknown item types and drops malformed chapter data", () => {
    const items: ProgressItem[] = [
      { itemId: "b", itemType: "badge", status: "earned", score: null, data: { at: 42 } },
      { itemId: "q", itemType: "quiz", status: "passed", score: 15, data: null },
      { itemId: "bad", itemType: "chapter", status: "in_progress", score: null, data: { nope: true } },
    ];
    const data = fromProgressItems(items);
    expect(data.badges).toEqual({ b: 42 });
    expect(data.readingProgress).toEqual({});
  });
});
