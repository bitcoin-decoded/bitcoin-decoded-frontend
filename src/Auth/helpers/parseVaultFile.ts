import { VAULT_FORMAT } from "../data";
import type { VaultContainer } from "../types";

// Validates a .bdw file's envelope (CDC §7.4) and returns the container so the UI
// can show the pseudo before asking for the password. Throws a coded error the UI
// maps to editorial text; never surfaces a raw parse trace.
export const parseVaultFile = (raw: string): VaultContainer => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("unrecognized-format");
  }

  const container = parsed as Partial<VaultContainer>;
  if (container.format !== VAULT_FORMAT.format) {
    throw new Error("unrecognized-format");
  }
  if (typeof container.version !== "number" || container.version > VAULT_FORMAT.version) {
    throw new Error("newer-version");
  }
  if (!container.kdf || !container.cipher || !container.publicKey || !container.username) {
    throw new Error("unrecognized-format");
  }
  return container as VaultContainer;
};
