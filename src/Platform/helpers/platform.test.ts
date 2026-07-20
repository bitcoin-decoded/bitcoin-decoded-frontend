import { describe, expect, it } from "vitest";

import { isBrowser } from "./isBrowser";
import { readStored } from "./readStored";
import { writeStored } from "./writeStored";

/**
 * The guarantee this domain exists for.
 *
 * The build renders every route under Node to produce indexable HTML, and every
 * crash found while making that work came from persisted state being read while
 * a component initialised. Vitest runs under Node with no DOM, so these assert
 * the real condition rather than a simulation of it.
 *
 * Nothing outside this domain is imported here, deliberately: these stay fast
 * and cannot fail for a reason unrelated to their subject. The whole-tree
 * guarantee is asserted separately, in `nodeSafety.test.tsx`.
 */
describe("platform, with no browser present", () => {
  it("knows there is none", () => {
    expect(typeof window).toBe("undefined");
    expect(isBrowser).toBe(false);
  });

  it("reads nothing rather than throwing", () => {
    expect(() => readStored("anything")).not.toThrow();
    // Null is what every caller turns into its own default, which is what the
    // build should render.
    expect(readStored("anything")).toBeNull();
  });

  it("writes nothing rather than throwing", () => {
    expect(() => writeStored("anything", "value")).not.toThrow();
  });
});
