import { renderToString } from "react-dom/server";

import { describe, expect, it, vi } from "vitest";

import { App } from "../../App";
import type { Language } from "../../I18n";
import { ROUTE_NAME, type RouteName } from "../../Routing";

// Issue #173: the prerendered head is single, but createRoot re-adds React's
// own copy of every hoisted tag, so any tag dropPrerenderedHead does not remove
// duplicates after hydration. This renders through the real prerender path and
// guards the head surface so that drift (a new PageHead tag the drop misses,
// exactly how twitter: slipped through in #231) fails here instead of in prod.

const silently = <T,>(run: () => T): T => {
  const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    return run();
  } finally {
    quiet.mockRestore();
  }
};

const TAG = /<title>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*\/?>/g;

const signature = (tag: string): string => {
  if (tag.startsWith("<title")) return "title";
  const element = tag.startsWith("<meta") ? "meta" : "link";
  const attr = element === "link" ? "rel" : /\bproperty="/.test(tag) ? "property" : "name";
  const value = tag.match(new RegExp(`\\b${attr}="([^"]+)"`))?.[1] ?? "";
  return `${element}[${attr}=${value}]`;
};

const headSignatures = (route: RouteName, language: Language): string[] =>
  (silently(() => renderToString(<App route={route} language={language} />)).match(TAG) ?? []).map(
    signature,
  );

// Mirrors dropPrerenderedHead's selector. A head tag PageHead emits that this
// does not recognise is one the drop misses. Keep the two in lockstep.
const isDropped = (sig: string): boolean =>
  sig === "title" ||
  sig === "meta[name=description]" ||
  sig === "meta[name=robots]" ||
  sig.startsWith("meta[name=twitter:") ||
  sig.startsWith("meta[property=og:") ||
  sig === "link[rel=canonical]" ||
  sig === "link[rel=alternate]";

const REQUIRED_ON_CONTENT = [
  "title",
  "meta[name=description]",
  "meta[property=og:site_name]",
  "meta[property=og:type]",
  "meta[property=og:locale]",
  "meta[property=og:title]",
  "meta[property=og:description]",
  "meta[property=og:url]",
  "meta[property=og:image]",
  "meta[name=twitter:card]",
  "meta[name=twitter:site]",
  "meta[name=twitter:title]",
  "meta[name=twitter:description]",
  "meta[name=twitter:image]",
  "link[rel=canonical]",
];

const ROUTES: [string, RouteName, Language][] = [
  ["home fr", ROUTE_NAME.HomePage, "fr"],
  ["home en", ROUTE_NAME.HomePage, "en"],
  ["content fr", ROUTE_NAME.Bitcoin_5, "fr"],
  ["content en", ROUTE_NAME.Bitcoin_5, "en"],
];

describe("prerendered head vs dropPrerenderedHead", () => {
  it.each(ROUTES)("drops every tag PageHead hoists into <head> (%s)", (_label, route, language) => {
    const escaped = headSignatures(route, language).filter((sig) => !isDropped(sig));
    expect(escaped).toEqual([]);
  });

  it.each(ROUTES.filter(([label]) => label.startsWith("content")))(
    "renders each SEO tag exactly once (%s)",
    (_label, route, language) => {
      const sigs = headSignatures(route, language);
      for (const required of REQUIRED_ON_CONTENT) {
        expect(sigs.filter((sig) => sig === required)).toEqual([required]);
      }
    },
  );
});
