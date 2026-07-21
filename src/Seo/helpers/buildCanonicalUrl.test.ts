import { describe, expect, it } from "vitest";

import { ROUTE_NAME, ROUTE_PATH } from "../../Routing";
import { SITE } from "../data";

import { buildCanonicalUrl } from "./buildCanonicalUrl";

const ROUTES = Object.values(ROUTE_NAME);

/**
 * The canonical address is what a search engine is told to treat as the real
 * one. Getting it subtly wrong is worse than omitting it: the pages still
 * exist, but each one points at an address that answers nothing.
 */
describe("buildCanonicalUrl", () => {
  it("gives every route an absolute address", () => {
    for (const route of ROUTES) {
      expect(buildCanonicalUrl(route), route).toMatch(/^https:\/\/[a-z0-9.-]+\//);
    }
  });

  it("never doubles the slash between origin and path", () => {
    // The one realistic way this breaks: a trailing slash added to `SITE.url`,
    // which every path already starts with. It would spoil all of them at once.
    expect(SITE.url).not.toMatch(/\/$/);
    for (const route of ROUTES) {
      expect(buildCanonicalUrl(route).slice("https://".length), route).not.toContain("//");
    }
  });

  it("names the same address the build writes the file at", () => {
    for (const route of ROUTES) {
      expect(buildCanonicalUrl(route)).toBe(`${SITE.url}${ROUTE_PATH[route]}`);
    }
  });

  it("points the home page at the bare origin", () => {
    expect(buildCanonicalUrl(ROUTE_NAME.HomePage)).toBe(`${SITE.url}/`);
  });
});
