import { authFetch } from "./authFetch.js";

// Sign out (CDC §7.7): clear the session cookie server-side. The vault stays in
// IndexedDB, so the reader can unlock again. Best-effort on the network call —
// an expired cookie lapses on its own anyway.
export const logoutSession = async (): Promise<void> => {
  try {
    await authFetch("/api/auth/logout", { method: "POST" });
  } catch {
    // Nothing to undo locally; the cookie will lapse regardless.
  }
};
