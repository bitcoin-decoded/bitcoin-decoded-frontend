import { describe, expect, it } from "vitest";

import { formatPublicKey } from "./formatPublicKey.js";

describe("formatPublicKey", () => {
  it("keeps the first and last eight characters around an ellipsis", () => {
    const key = "0123456789abcdef".repeat(4); // 64 hex chars
    expect(formatPublicKey(key)).toBe("01234567...89abcdef");
  });

  it("returns a key too short to shorten unchanged", () => {
    expect(formatPublicKey("abcd1234")).toBe("abcd1234");
    expect(formatPublicKey("0123456789abcdef")).toBe("0123456789abcdef");
  });
});
