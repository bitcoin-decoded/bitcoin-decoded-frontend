import { renderToString } from "react-dom/server";

import { describe, expect, it, vi } from "vitest";

import { App } from "../App";
import { ROUTE_NAME } from "../Routing";

/**
 * The guarantee the `Platform` domain exists for: the application renders with
 * no browser present, which is what the build does to produce indexable HTML.
 *
 * This sits at the domain root because it does not test any single helper. It
 * asserts a property of the whole tree, that nothing anywhere reaches for
 * `window`, `localStorage` or `matchMedia` while a component initialises, and
 * that no module dereferences an imported binding before its cycle has
 * resolved. Neither can be asserted from one file.
 *
 * Vitest runs under Node with no DOM and without bundling, so this is stricter
 * than the Vite SSR build: a cycle Vite would quietly resolve fails here.
 */
const silently = <T,>(render: () => T): T => {
  // Some pages still warn about missing keys. That is a pre-existing defect
  // tracked separately, and muting it keeps this failing only for its own
  // reason.
  const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    return render();
  } finally {
    quiet.mockRestore();
  }
};

describe("rendering without a browser", () => {
  it("has no browser to reach for", () => {
    expect(typeof window).toBe("undefined");
  });

  it.each([
    [ROUTE_NAME.HomePage],
    [ROUTE_NAME.Banking_1],
    [ROUTE_NAME.Banking_7],
    [ROUTE_NAME.MoneyLaws_3],
    [ROUTE_NAME.Bitcoin_4],
    [ROUTE_NAME.GetStarted],
    [ROUTE_NAME.Badges],
    [ROUTE_NAME.NotFound],
  ])("renders %s", (route) => {
    const html = silently(() => renderToString(<App route={route} />));
    expect(html.length).toBeGreaterThan(1000);
  });

  it("renders the route it is given, not a default", () => {
    // Each build output must hold its own chapter. Falling back to the home
    // page would put one page inside all twenty-six files.
    const banking = silently(() => renderToString(<App route={ROUTE_NAME.Banking_1} />));
    const bitcoin = silently(() => renderToString(<App route={ROUTE_NAME.Bitcoin_4} />));
    expect(banking).not.toBe(bitcoin);
  });
});
