import { describe, expect, it } from "vitest";

import type { StoredChapterProgress, UserData } from "../types";

import { mergeUserData } from "./mergeUserData";

const chapter = (over: Partial<StoredChapterProgress> = {}): StoredChapterProgress => ({
  maxRevealed: 2,
  current: 2,
  done: [0, 1],
  finished: false,
  lastVisitedBlock: 1,
  blockCount: 9,
  ...over,
});

describe("mergeUserData", () => {
  it("unions badges and keeps the earliest earned date", () => {
    const a: UserData = { badges: { x: 500, y: 10 }, readingProgress: {} };
    const b: UserData = { badges: { x: 900, z: 20 }, readingProgress: {} };
    expect(mergeUserData(a, b).badges).toEqual({ x: 500, y: 10, z: 20 });
  });

  it("keeps a finished chapter over an unfinished one, whichever side", () => {
    const local: UserData = { badges: {}, readingProgress: { c: chapter({ finished: true, maxRevealed: 5 }) } };
    const server: UserData = { badges: {}, readingProgress: { c: chapter({ finished: false, maxRevealed: 8 }) } };
    expect(mergeUserData(local, server).readingProgress.c.finished).toBe(true);
    expect(mergeUserData(server, local).readingProgress.c.finished).toBe(true);
  });

  it("keeps the further reading when neither is finished", () => {
    const local: UserData = { badges: {}, readingProgress: { c: chapter({ maxRevealed: 3 }) } };
    const server: UserData = { badges: {}, readingProgress: { c: chapter({ maxRevealed: 6 }) } };
    expect(mergeUserData(local, server).readingProgress.c.maxRevealed).toBe(6);
  });
});
