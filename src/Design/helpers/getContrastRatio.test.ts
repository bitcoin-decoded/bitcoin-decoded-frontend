import { describe, expect, it } from "vitest";

import { getContrastRatio } from "./getContrastRatio";

describe("getContrastRatio", () => {
  it("returns the WCAG extremes", () => {
    expect(getContrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(getContrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
  });

  it("is symmetric", () => {
    expect(getContrastRatio("#1d4ed8", "#ffffff")).toEqual(getContrastRatio("#ffffff", "#1d4ed8"));
  });

  it("tolerates a missing hash", () => {
    expect(getContrastRatio("000000", "ffffff")).toBeCloseTo(21, 5);
  });

  it("returns null when a colour is not a 6-digit hex", () => {
    expect(getContrastRatio("rgba(0, 0, 0, 0.5)", "#ffffff")).toBeNull();
    expect(getContrastRatio("#fff", "#ffffff")).toBeNull();
  });
});
