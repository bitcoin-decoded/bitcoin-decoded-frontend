import { createVault } from "./createVault.js";

// The pseudo kept in cleartext in the vault container (CDC §4.5), read without the
// password so the unlock screen can greet the reader by name.
export const readVaultUsername = async (): Promise<string | null> =>
  createVault()
    .load()
    .then((container) => container?.username ?? null);
