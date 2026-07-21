import { describe, expect, it } from "vitest";

import type { Language } from "../../I18n";
import { LANGUAGE_PREFIX } from "../data/LANGUAGE_PREFIX";
import { ROUTE_NAME } from "../data/ROUTE_NAME";

import { getRouteFromLegacyHash } from "./getRouteFromLegacyHash";
import { getRoutePath } from "./getRoutePath";
import { resolveRoute } from "./resolveRoute";

const ROUTES = Object.values(ROUTE_NAME);
const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];
const EVERY = LANGUAGES.flatMap((language) => ROUTES.map((route) => ({ route, language })));

describe("the address table", () => {
  it("gives every route in every language a distinct address", () => {
    const paths = EVERY.map(({ route, language }) => getRoutePath(route, language));
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("keeps slugs URL-safe and free of chapter numbers", () => {
    for (const { route, language } of EVERY) {
      const path = getRoutePath(route, language);
      // Lowercase, unaccented, hyphen separated. An accent or a capital would
      // survive here and come back percent-encoded in a search result.
      expect(path, path).toMatch(/^\/$|^(\/[a-z0-9-]+)+$/);
      // "/404" is a number naming a condition, not a position in a module.
      if (route === ROUTE_NAME.NotFound) continue;
      expect(path, `${path} carries a position that reordering would break`).not.toMatch(/\d{2}/);
    }
  });

  it("puts English behind its prefix and French at the root", () => {
    for (const route of ROUTES) {
      expect(getRoutePath(route, "en"), route).toMatch(/^\/en(\/|$)/);
      expect(getRoutePath(route, "fr"), route).not.toMatch(/^\/en(\/|$)/);
    }
  });

  it("gives each front page its own root rather than a trailing slash", () => {
    expect(getRoutePath(ROUTE_NAME.HomePage, "fr")).toBe("/");
    expect(getRoutePath(ROUTE_NAME.HomePage, "en")).toBe("/en");
  });
});

describe("resolveRoute", () => {
  it("round-trips every route and language through its address", () => {
    for (const { route, language } of EVERY) {
      expect(resolveRoute(getRoutePath(route, language))).toEqual({ route, language });
    }
  });

  it("treats a trailing slash as the same page", () => {
    expect(resolveRoute("/bitcoin/halving/")).toEqual({
      route: ROUTE_NAME.Bitcoin_5,
      language: "fr",
    });
    expect(resolveRoute("/en/bitcoin/halving/")).toEqual({
      route: ROUTE_NAME.Bitcoin_5,
      language: "en",
    });
    expect(resolveRoute("")).toEqual({ route: ROUTE_NAME.HomePage, language: "fr" });
  });

  it("claims nothing it does not own", () => {
    expect(resolveRoute("/bitcoin")).toBeNull();
    expect(resolveRoute("/en")).not.toBeNull();
    expect(resolveRoute("/bitcoin/does-not-exist")).toBeNull();
    // A French slug behind the English prefix is not an address the site writes.
    expect(resolveRoute("/en/bitcoin/preuve-de-travail")).toBeNull();
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
    expect(getRouteFromLegacyHash("#section-title")).toBeNull();
  });
});
