import { describe, expect, it } from "vitest";

import { resolveInitialStatus } from "./resolveInitialStatus.js";

describe("resolveInitialStatus", () => {
  it("is authenticated when a session is live", () => {
    expect(resolveInitialStatus({ username: "satoshi" }, false)).toBe("authenticated");
  });

  it("is locked when there is no session but a vault exists on this device", () => {
    expect(resolveInitialStatus(null, true)).toBe("locked");
  });

  it("is anonymous when there is no session and no vault", () => {
    expect(resolveInitialStatus(null, false)).toBe("anonymous");
  });
});
