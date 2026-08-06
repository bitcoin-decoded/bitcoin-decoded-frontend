import "fake-indexeddb/auto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createAccount } from "./createAccount.js";
import { generateMnemonic } from "./generateMnemonic.js";
import { unlock } from "./unlock.js";

// Real crypto + real vault (fake-indexeddb), only the network mocked: this proves
// the create -> unlock orchestration, not the endpoints (those are covered live).
const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

let verifyResponse: Response;

const resetDb = (): Promise<void> =>
  new Promise((resolve) => {
    const req = indexedDB.deleteDatabase("bitcoin-decoded");
    req.onsuccess = req.onerror = () => resolve();
  });

beforeEach(async () => {
  await resetDb();
  verifyResponse = json({ username: "satoshi" });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL) => {
      const path = String(url);
      if (path.endsWith("/api/auth/challenge")) {
        return json({ nonce: "ab".repeat(32), issuedAt: new Date().toISOString() });
      }
      if (path.endsWith("/api/auth/register")) return json({ username: "satoshi" });
      if (path.endsWith("/api/auth/verify")) return verifyResponse;
      return json({}, 404);
    }),
  );
});

afterEach(() => vi.unstubAllGlobals());

describe("auth flow", () => {
  it("creates an account, then unlocks it with the same password", async () => {
    const mnemonic = generateMnemonic();
    const created = await createAccount({ mnemonic, username: "satoshi", password: "correct horse battery" });
    expect(created.username).toBe("satoshi");

    const unlocked = await unlock("correct horse battery");
    expect(unlocked.username).toBe("satoshi");
  });

  it("rejects a wrong password without a network call", async () => {
    const mnemonic = generateMnemonic();
    await createAccount({ mnemonic, username: "satoshi", password: "correct horse battery" });
    await expect(unlock("wrong password")).rejects.toMatchObject({ code: "wrong_password" });
  });

  it("reports no vault on a fresh device", async () => {
    await expect(unlock("anything")).rejects.toMatchObject({ code: "no_vault" });
  });

  it("surfaces account_not_found from the server", async () => {
    const mnemonic = generateMnemonic();
    await createAccount({ mnemonic, username: "satoshi", password: "pw12345678" });
    verifyResponse = json({ error: "account_not_found" }, 404);
    await expect(unlock("pw12345678")).rejects.toMatchObject({ code: "account_not_found" });
  });
});
