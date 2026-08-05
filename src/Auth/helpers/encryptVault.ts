import { PBKDF2_ITERATIONS, VAULT_FORMAT } from "../data";
import type { VaultContainer } from "../types";

import { bytesToBase64 } from "./base64";

// PBKDF2-SHA256 (600k) → AES-256-GCM over the mnemonic itself (CDC §4.4/§4.5),
// with a fresh random salt and IV every call. We encrypt the source, not a
// derived key.
export const encryptVault = async (input: {
  mnemonic: string;
  password: string;
  publicKeyHex: string;
  username: string;
}): Promise<VaultContainer> => {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const baseKey = await crypto.subtle.importKey("raw", encoder.encode(input.password), "PBKDF2", false, [
    "deriveKey",
  ]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(input.mnemonic)),
  );

  return {
    format: VAULT_FORMAT.format,
    version: VAULT_FORMAT.version,
    kdf: { algo: "PBKDF2-SHA256", iterations: PBKDF2_ITERATIONS, salt: bytesToBase64(salt) },
    cipher: { algo: "AES-256-GCM", iv: bytesToBase64(iv), data: bytesToBase64(ciphertext) },
    publicKey: input.publicKeyHex,
    username: input.username,
    createdAt: new Date().toISOString(),
  };
};
