import { AuthError } from "./AuthError.js";
import { createVault } from "./createVault.js";
import { decryptVault } from "./decryptVault.js";
import { deriveKeyPair } from "./deriveKeyPair.js";
import { login } from "./login.js";
import { setSessionKey } from "./sessionKey.js";

// Return-to-app unlock (CDC §7.2): read the vault, decrypt with the password,
// derive the key, re-open the session. A wrong password is the GCM tag failing,
// mapped to a clean code (no counter, no lockout — the 600k PBKDF2 is the cost).
export const unlock = async (password: string): Promise<{ username: string }> => {
  const container = await createVault().load();
  if (!container) throw new AuthError("no_vault");

  let mnemonic: string;
  try {
    mnemonic = await decryptVault(container, password);
  } catch {
    throw new AuthError("wrong_password");
  }

  const keyPair = deriveKeyPair(mnemonic);
  const result = await login(keyPair);
  setSessionKey(keyPair);
  return result;
};
