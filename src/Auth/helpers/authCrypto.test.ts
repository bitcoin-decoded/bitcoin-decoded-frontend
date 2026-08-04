import { describe, expect, it } from "vitest";

import { buildSignMessage } from "./buildSignMessage";
import { decryptVault } from "./decryptVault";
import { deriveKeyPair } from "./deriveKeyPair";
import { encryptVault } from "./encryptVault";
import { generateMnemonic } from "./generateMnemonic";
import { signChallenge } from "./signChallenge";
import { validateMnemonic } from "./validateMnemonic";
import { verifyChallenge } from "./verifyChallenge";

// All-zero-entropy BIP39 vector: eleven "abandon" then "about" (valid checksum).
const FIXED_MNEMONIC =
  "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

const vaultInput = (overrides: Partial<{ mnemonic: string; password: string }> = {}) => ({
  mnemonic: FIXED_MNEMONIC,
  password: "correct horse battery staple",
  publicKeyHex: "00",
  username: "alice",
  ...overrides,
});

describe("auth crypto", () => {
  it("derives a stable public key from a fixed mnemonic", () => {
    const a = deriveKeyPair(FIXED_MNEMONIC);
    const b = deriveKeyPair(FIXED_MNEMONIC);
    expect(a.publicKeyHex).toBe(b.publicKeyHex);
    expect(a.publicKeyHex).toMatch(/^[0-9a-f]{64}$/);
  });

  it("round-trips the mnemonic through encrypt then decrypt", async () => {
    const vault = await encryptVault(vaultInput());
    expect(await decryptVault(vault, "correct horse battery staple")).toBe(FIXED_MNEMONIC);
  });

  it("rejects decryption with a wrong password, cleanly", async () => {
    const vault = await encryptVault(vaultInput());
    await expect(decryptVault(vault, "wrong password")).rejects.toThrow();
  });

  it("verifies a client signature server-side on a reconstructed message", () => {
    const { privateKey, publicKeyHex } = deriveKeyPair(FIXED_MNEMONIC);
    const message = {
      publicKeyHex,
      nonceHex: "a".repeat(64),
      issuedAtIso: "2026-08-04T10:00:00.000Z",
    };
    const signature = signChallenge(message, privateKey);
    expect(verifyChallenge(message, signature, publicKeyHex)).toBe(true);
    // The server holding a different nonce must reject the same signature.
    expect(verifyChallenge({ ...message, nonceHex: "b".repeat(64) }, signature, publicKeyHex)).toBe(false);
  });

  it("rejects a mnemonic with a bad checksum, accepts a generated one", () => {
    expect(validateMnemonic(FIXED_MNEMONIC)).toBe(true);
    expect(validateMnemonic(`${"abandon ".repeat(11)}abandon`)).toBe(false);
    expect(validateMnemonic(generateMnemonic())).toBe(true);
  });

  it("produces a different ciphertext each time (random salt and IV)", async () => {
    const a = await encryptVault(vaultInput());
    const b = await encryptVault(vaultInput());
    expect(a.cipher.data).not.toBe(b.cipher.data);
    expect(a.cipher.iv).not.toBe(b.cipher.iv);
    expect(a.kdf.salt).not.toBe(b.kdf.salt);
  });

  it("builds the exact ASCII sign message", () => {
    const message = buildSignMessage({
      publicKeyHex: "deadbeef",
      nonceHex: "cafe",
      issuedAtIso: "2026-08-04T10:00:00.000Z",
    });
    expect(message).toBe(
      "Bitcoin.Decoded - connexion\nCle: deadbeef\nNonce: cafe\nEmis: 2026-08-04T10:00:00.000Z",
    );
    // Guard against an accidental non-ASCII character (e.g. an em dash).
    // eslint-disable-next-line no-control-regex
    expect(/^[\x00-\x7f]*$/.test(message)).toBe(true);
  });
});
