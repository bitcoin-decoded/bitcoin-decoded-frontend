import { createVault } from "./createVault.js";

// The account's public key, kept in cleartext in the vault container (CDC §4.5),
// read without the password so the settings screen can show it (§14.11).
export const readVaultPublicKey = async (): Promise<string | null> =>
  createVault()
    .load()
    .then((container) => container?.publicKey ?? null);
