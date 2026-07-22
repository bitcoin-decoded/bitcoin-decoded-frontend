import { describe, expect, it } from "vitest";

import { ROUTE_NAME } from "../data/ROUTE_NAME";

import { getLanguageFromPath } from "./getLanguageFromPath";
import { getRoutePath } from "./getRoutePath";

const ROUTES = Object.values(ROUTE_NAME);

describe("getLanguageFromPath", () => {
  it("agrees with the address table on every route the site writes", () => {
    for (const route of ROUTES) {
      expect(getLanguageFromPath(getRoutePath(route, "en")), route).toBe("en");
      expect(getLanguageFromPath(getRoutePath(route, "fr")), route).toBe("fr");
    }
  });

  it("reads the language of addresses no route claims", () => {
    expect(getLanguageFromPath("/en/nawak")).toBe("en");
    expect(getLanguageFromPath("/en/bitcoin/pas-un-chapitre")).toBe("en");
    expect(getLanguageFromPath("/nawak")).toBe("fr");
    expect(getLanguageFromPath("/bitcoin/pas-un-chapitre")).toBe("fr");
  });

  it("matches the prefix as a segment, never as a leading substring", () => {
    expect(getLanguageFromPath("/en")).toBe("en");
    expect(getLanguageFromPath("/english-lessons")).toBe("fr");
    expect(getLanguageFromPath("/enfin")).toBe("fr");
    expect(getLanguageFromPath("/en-passant")).toBe("fr");
  });

  it("treats the roots as French", () => {
    expect(getLanguageFromPath("/")).toBe("fr");
    expect(getLanguageFromPath("")).toBe("fr");
  });
});
