import { describe, expect, it } from "vitest";

import type { Language } from "../../I18n";
import { getRoutePath, LANGUAGE_PREFIX, ROUTE_NAME } from "../../Routing";
import { SITE } from "../data";

import { buildCanonicalUrl } from "./buildCanonicalUrl";

const ROUTES = Object.values(ROUTE_NAME);
const LANGUAGES = Object.keys(LANGUAGE_PREFIX) as Language[];
const EVERY = LANGUAGES.flatMap((language) => ROUTES.map((route) => ({ route, language })));

describe("buildCanonicalUrl", () => {
  it("gives every route in every language an absolute address", () => {
    for (const { route, language } of EVERY) {
      expect(buildCanonicalUrl(route, language), `${route} ${language}`).toMatch(
        /^https:\/\/[a-z0-9.-]+\//,
      );
    }
  });

  it("never doubles the slash between origin and path", () => {
    expect(SITE.url).not.toMatch(/\/$/);
    for (const { route, language } of EVERY) {
      expect(
        buildCanonicalUrl(route, language).slice("https://".length),
        `${route} ${language}`,
      ).not.toContain("//");
    }
  });

  it("names the same address the build writes the file at", () => {
    for (const { route, language } of EVERY) {
      expect(buildCanonicalUrl(route, language)).toBe(`${SITE.url}${getRoutePath(route, language)}`);
    }
  });

  it("gives the two languages of one page two different addresses", () => {
    for (const route of ROUTES) {
      expect(buildCanonicalUrl(route, "fr")).not.toBe(buildCanonicalUrl(route, "en"));
    }
  });

  it("points each front page at its own root", () => {
    expect(buildCanonicalUrl(ROUTE_NAME.HomePage, "fr")).toBe(`${SITE.url}/`);
    expect(buildCanonicalUrl(ROUTE_NAME.HomePage, "en")).toBe(`${SITE.url}/en`);
  });
});
