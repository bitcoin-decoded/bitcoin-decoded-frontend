import { describe, expect, it } from "vitest";

import { getArrivalAnchor } from "./getArrivalAnchor";

describe("getArrivalAnchor", () => {
  it("opens a fresh chapter at its header", () => {
    expect(getArrivalAnchor({ finished: false, current: 0 })).toBe("chapterTop");
  });

  it("returns a finished chapter to its header, wherever the reader stopped", () => {
    expect(getArrivalAnchor({ finished: true, current: 0 })).toBe("chapterTop");
    expect(getArrivalAnchor({ finished: true, current: 4 })).toBe("chapterTop");
  });

  it("puts a part-read chapter back on the block the reader stopped at", () => {
    expect(getArrivalAnchor({ finished: false, current: 1 })).toBe("activeBlock");
    expect(getArrivalAnchor({ finished: false, current: 7 })).toBe("activeBlock");
  });

  it("treats a chapter sitting on block 0 as a fresh one", () => {
    // Block 0 is where every chapter starts, so it carries no "I was here"
    // information — the header wins.
    expect(getArrivalAnchor({ finished: false, current: 0 })).toBe("chapterTop");
  });
});
