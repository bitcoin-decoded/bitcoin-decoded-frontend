import { describe, expect, it } from "vitest";

import { getArrivalAnchor } from "./getArrivalAnchor";
import { getChapterState } from "./getChapterState";
import { readLastVisitedBlock } from "./readLastVisitedBlock";

/** The three states, end to end: stored record -> state -> anchor. */
const anchorFor = (stored: {
  maxRevealed: number;
  current: number;
  done: number[];
  finished: boolean;
  lastVisitedBlock?: number | null;
  badgeEarned: boolean;
}) => {
  const lastVisitedBlock = readLastVisitedBlock(stored);
  return getArrivalAnchor(
    getChapterState({ badgeEarned: stored.badgeEarned, lastVisitedBlock }),
    lastVisitedBlock,
  );
};

describe("getChapterState", () => {
  it("state 1: never started", () => {
    expect(getChapterState({ badgeEarned: false, lastVisitedBlock: null })).toBe("unvisited");
  });

  it("state 2: started, badge not earned", () => {
    expect(getChapterState({ badgeEarned: false, lastVisitedBlock: 3 })).toBe("inProgress");
  });

  it("state 2: started and back on block 01 is still started", () => {
    expect(getChapterState({ badgeEarned: false, lastVisitedBlock: 0 })).toBe("inProgress");
  });

  it("state 3: badge earned wins over any reading position", () => {
    expect(getChapterState({ badgeEarned: true, lastVisitedBlock: null })).toBe("completed");
    expect(getChapterState({ badgeEarned: true, lastVisitedBlock: 4 })).toBe("completed");
  });
});

describe("getArrivalAnchor", () => {
  it("opens an unvisited chapter at its header", () => {
    expect(getArrivalAnchor("unvisited", null)).toEqual({ type: "top" });
  });

  it("resumes a chapter in progress on its block", () => {
    expect(getArrivalAnchor("inProgress", 3)).toEqual({ type: "block", index: 3 });
  });

  it("resumes on block 01 when that is where the reader stopped", () => {
    expect(getArrivalAnchor("inProgress", 0)).toEqual({ type: "block", index: 0 });
  });

  it("reopens a completed chapter at its header", () => {
    expect(getArrivalAnchor("completed", 4)).toEqual({ type: "top" });
  });
});

describe("readLastVisitedBlock: migrating records written before the field", () => {
  it("treats a chapter merely opened as never started", () => {
    expect(
      readLastVisitedBlock({ maxRevealed: 0, current: 0, done: [], finished: false }),
    ).toBeNull();
  });

  it("reads progress from maxRevealed when the reader walked back to block 01", () => {
    // The case `current` alone cannot tell apart from "merely opened".
    expect(readLastVisitedBlock({ maxRevealed: 3, current: 0, done: [], finished: false })).toBe(0);
  });

  it("counts a manipulated tool block on block 0 as started", () => {
    expect(readLastVisitedBlock({ maxRevealed: 0, current: 0, done: [0], finished: false })).toBe(0);
  });

  it("counts a sealed pass as started", () => {
    expect(readLastVisitedBlock({ maxRevealed: 0, current: 0, done: [], finished: true })).toBe(0);
  });

  it("prefers the stored field once it exists, including null", () => {
    expect(
      readLastVisitedBlock({
        maxRevealed: 5,
        current: 2,
        done: [1],
        finished: false,
        lastVisitedBlock: null,
      }),
    ).toBeNull();
    expect(
      readLastVisitedBlock({
        maxRevealed: 5,
        current: 2,
        done: [],
        finished: false,
        lastVisitedBlock: 2,
      }),
    ).toBe(2);
  });
});

describe("the three states, from a stored record", () => {
  it("first visit → top", () => {
    expect(
      anchorFor({ maxRevealed: 0, current: 0, done: [], finished: false, badgeEarned: false }),
    ).toEqual({ type: "top" });
  });

  it("in progress on block 3 → block 3", () => {
    expect(
      anchorFor({ maxRevealed: 3, current: 3, done: [], finished: false, badgeEarned: false }),
    ).toEqual({ type: "block", index: 3 });
  });

  it("completed → top, even mid re-read", () => {
    expect(
      anchorFor({ maxRevealed: 2, current: 2, done: [], finished: false, badgeEarned: true }),
    ).toEqual({ type: "top" });
  });
});
