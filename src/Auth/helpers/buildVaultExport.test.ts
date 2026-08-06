import { describe, expect, it } from "vitest";

import type { VaultContainer } from "../types/index.js";

import { buildVaultExport } from "./buildVaultExport.js";
import { parseVaultFile } from "./parseVaultFile.js";

const container: VaultContainer = {
  format: "bitcoin-decoded-vault",
  version: 1,
  kdf: { algo: "PBKDF2-SHA256", iterations: 600000, salt: "c2FsdA==" },
  cipher: { algo: "AES-256-GCM", iv: "aXY=", data: "ZGF0YQ==" },
  publicKey: "ab".repeat(32),
  username: "satoshi",
  createdAt: "2026-08-01T00:00:00.000Z",
};

describe("buildVaultExport", () => {
  it("names the file with the pseudo and the export date", () => {
    const { filename } = buildVaultExport(container, new Date("2026-09-15T12:00:00.000Z"));
    expect(filename).toBe("bitcoin-decoded-satoshi-2026-09-15.bdw");
  });

  it("produces content that parses back to the same container", () => {
    const { content } = buildVaultExport(container);
    expect(parseVaultFile(content)).toEqual(container);
  });
});
