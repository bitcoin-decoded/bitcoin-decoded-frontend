import { renderToString } from "react-dom/server";

import { describe, expect, it, vi } from "vitest";

import { App } from "../App";
import { ROUTE_NAME } from "../Routing";

const silently = <T,>(render: () => T): T => {
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
    const banking = silently(() => renderToString(<App route={ROUTE_NAME.Banking_1} />));
    const bitcoin = silently(() => renderToString(<App route={ROUTE_NAME.Bitcoin_4} />));
    expect(banking).not.toBe(bitcoin);
  });
});
