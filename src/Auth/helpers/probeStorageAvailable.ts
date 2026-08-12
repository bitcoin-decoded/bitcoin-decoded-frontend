import { createVault } from "./createVault.js";

// Detect whether this browser will actually persist the vault (CDC §9). Private
// modes (notably Safari) can expose `indexedDB` yet reject the open, so a defined
// global is not enough — we attempt a real read. A failed probe means "usable
// session, but nothing is kept on this device", which the caller turns into a
// warning that pushes the export (§14.12).
export const probeStorageAvailable = async (): Promise<boolean> => {
  if (typeof indexedDB === "undefined") return false;
  try {
    await createVault().exists();
    return true;
  } catch {
    return false;
  }
};
