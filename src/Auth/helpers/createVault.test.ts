import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";

import type { VaultContainer } from "../types/index.js";

import { createVault } from "./createVault.js";

const container: VaultContainer = {
  format: "bitcoin-decoded-vault",
  version: 1,
  kdf: { algo: "PBKDF2-SHA256", iterations: 600000, salt: "c2FsdA==" },
  cipher: { algo: "AES-256-GCM", iv: "aXY=", data: "ZGF0YQ==" },
  publicKey: "ab".repeat(32),
  username: "satoshi",
  createdAt: "2026-08-01T00:00:00.000Z",
};

const reset = (): Promise<void> =>
  new Promise((resolve) => {
    const req = indexedDB.deleteDatabase("bitcoin-decoded");
    req.onsuccess = req.onerror = () => resolve();
  });

describe("createVault", () => {
  beforeEach(reset);

  it("reports no vault on a fresh device", async () => {
    const vault = createVault();
    expect(await vault.exists()).toBe(false);
    expect(await vault.load()).toBeNull();
  });

  it("saves then loads the container unchanged", async () => {
    const vault = createVault();
    await vault.save(container);
    expect(await vault.exists()).toBe(true);
    expect(await vault.load()).toEqual(container);
  });

  it("erases the vault", async () => {
    const vault = createVault();
    await vault.save(container);
    await vault.clear();
    expect(await vault.exists()).toBe(false);
    expect(await vault.load()).toBeNull();
  });

  it("remembers backup metadata", async () => {
    const vault = createVault();
    expect(await vault.getBackupMeta()).toBeNull();
    await vault.setBackupMeta({ exportedAt: "2026-08-02T00:00:00.000Z", remindersDismissed: 2 });
    expect(await vault.getBackupMeta()).toEqual({
      exportedAt: "2026-08-02T00:00:00.000Z",
      remindersDismissed: 2,
    });
  });
});
