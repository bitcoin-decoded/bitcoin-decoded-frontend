import type { VaultContainer } from "../types";

import { base64ToBytes } from "./base64";

// Reverse of encryptVault. A wrong password fails the GCM authentication tag and
// throws; we surface a single clean error, never a partial value (CDC §10 test 3).
export const decryptVault = async (container: VaultContainer, password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const baseKey = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: base64ToBytes(container.kdf.salt),
      iterations: container.kdf.iterations,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );

  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: base64ToBytes(container.cipher.iv) },
      key,
      base64ToBytes(container.cipher.data),
    );
    return new TextDecoder().decode(plaintext);
  } catch {
    throw new Error("Vault decryption failed");
  }
};
