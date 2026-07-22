import { describe, expect, it } from "vitest";

import { isBrowser } from "./isBrowser";
import { readStored } from "./readStored";
import { writeStored } from "./writeStored";

describe("platform, with no browser present", () => {
  it("knows there is none", () => {
    expect(typeof window).toBe("undefined");
    expect(isBrowser).toBe(false);
  });

  it("reads nothing rather than throwing", () => {
    expect(() => readStored("anything")).not.toThrow();
    expect(readStored("anything")).toBeNull();
  });

  it("writes nothing rather than throwing", () => {
    expect(() => writeStored("anything", "value")).not.toThrow();
  });
});
