import { authFetch } from "./authFetch.js";
import { clearSessionKey } from "./sessionKey.js";

// Sign out (CDC §7.7): drop the in-memory key and clear the cookie server-side.
// The vault stays in IndexedDB, so the reader can unlock again. Best-effort on
// the network call — the key is already gone locally either way.
export const logoutSession = async (): Promise<void> => {
  clearSessionKey();
  try {
    await authFetch("/api/auth/logout", { method: "POST" });
  } catch {
    // The cookie will lapse on its own; the local key is what mattered.
  }
};
