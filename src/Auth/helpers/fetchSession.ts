import { authFetch } from "./authFetch.js";

// The session probe (GET /api/auth/session) used on app open. Null means "no
// active session" — a 401 (not logged in) and a transport failure (offline) both
// answer null, so the caller falls back to the vault to decide locked vs guest.
export const fetchSession = async (): Promise<{ username: string } | null> => {
  try {
    const { status, body } = await authFetch("/api/auth/session");
    if (status !== 200 || typeof body.username !== "string") return null;
    return { username: body.username };
  } catch {
    return null;
  }
};
