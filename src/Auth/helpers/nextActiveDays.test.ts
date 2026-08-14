import { describe, expect, it } from "vitest";

import { nextActiveDays } from "./nextActiveDays.js";

describe("nextActiveDays", () => {
  it("counts the first ever day as day 1", () => {
    expect(nextActiveDays(0, null, "2026-08-12")).toEqual({ days: 1, isNewDay: true });
  });

  it("does not bump on a repeat of the same calendar day", () => {
    expect(nextActiveDays(1, "2026-08-12", "2026-08-12")).toEqual({ days: 1, isNewDay: false });
  });

  it("bumps to the 3rd day on a new calendar day", () => {
    expect(nextActiveDays(2, "2026-08-12", "2026-08-13")).toEqual({ days: 3, isNewDay: true });
  });

  it("treats a missing or garbage stored count as zero", () => {
    expect(nextActiveDays(NaN, "2026-08-11", "2026-08-12")).toEqual({ days: 1, isNewDay: true });
  });
});
