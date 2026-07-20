import { describe, expect, it } from "vitest";

import { ROUTE_NAME } from "../data/ROUTE_NAME";
import { ROUTE_PATH } from "../data/ROUTE_PATH";

import { getRouteFromLegacyHash } from "./getRouteFromLegacyHash";
import { getRouteFromPath } from "./getRouteFromPath";

const ROUTES = Object.values(ROUTE_NAME);

describe("ROUTE_PATH", () => {
  it("covers every route", () => {
    for (const route of ROUTES) {
      expect(ROUTE_PATH[route], `no path for ${route}`).toBeTruthy();
    }
  });

  it("gives every route a distinct address", () => {
    const paths = ROUTES.map((r) => ROUTE_PATH[r]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("keeps slugs URL-safe and free of chapter numbers", () => {
    for (const route of ROUTES) {
      const path = ROUTE_PATH[route];
      // Lowercase, unaccented, hyphen separated. An accent or a capital would
      // survive here and come back percent-encoded in a search result.
      expect(path, path).toMatch(/^\/$|^(\/[a-z0-9-]+)+$/);
      // "/404" is a number that names a condition, not a position in a module.
      if (route === ROUTE_NAME.NotFound) continue;
      expect(path, `${path} carries a position that reordering would break`).not.toMatch(/\d{2}/);
    }
  });
});

describe("getRouteFromPath", () => {
  it("round-trips every route through its address", () => {
    for (const route of ROUTES) {
      expect(getRouteFromPath(ROUTE_PATH[route])).toBe(route);
    }
  });

  it("treats a trailing slash as the same page", () => {
    expect(getRouteFromPath("/bitcoin/halving/")).toBe(ROUTE_NAME.Bitcoin_5);
    expect(getRouteFromPath("/bitcoin/halving")).toBe(ROUTE_NAME.Bitcoin_5);
    expect(getRouteFromPath("")).toBe(ROUTE_NAME.HomePage);
  });

  it("claims nothing it does not own", () => {
    expect(getRouteFromPath("/bitcoin")).toBeNull();
    expect(getRouteFromPath("/bitcoin/does-not-exist")).toBeNull();
    expect(getRouteFromPath("/systeme-bancaire/creation-monetaire/extra")).toBeNull();
  });
});

describe("getRouteFromLegacyHash", () => {
  it("still honours every address shared before paths existed", () => {
    for (const route of ROUTES) {
      expect(getRouteFromLegacyHash(`#${route}`)).toBe(route);
    }
  });

  it("ignores anything that is not an old route", () => {
    expect(getRouteFromLegacyHash("")).toBeNull();
    expect(getRouteFromLegacyHash("#")).toBeNull();
    expect(getRouteFromLegacyHash("#section-title")).toBeNull();
  });
});
