import { describe, expect, it } from "vitest";

import { resolveAccountReload } from "./resolveAccountReload";

describe("resolveAccountReload", () => {
  it("records the baseline on the first settle without reloading", () => {
    expect(resolveAccountReload(null, false)).toEqual({ settled: false, shouldReload: false });
    expect(resolveAccountReload(null, true)).toEqual({ settled: true, shouldReload: false });
  });

  it("reloads when a session appears during the visit (create/unlock)", () => {
    expect(resolveAccountReload(false, true)).toEqual({ settled: true, shouldReload: true });
  });

  it("reloads when the session goes away during the visit (logout/erase)", () => {
    expect(resolveAccountReload(true, false)).toEqual({ settled: false, shouldReload: true });
  });

  it("does nothing when the settled state is unchanged", () => {
    expect(resolveAccountReload(true, true)).toEqual({ settled: true, shouldReload: false });
    expect(resolveAccountReload(false, false)).toEqual({ settled: false, shouldReload: false });
  });
});
