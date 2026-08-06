import { authFetch } from "./authFetch.js";

// Live availability check for the username screen (CDC §7.1 écran 2). Returns the
// server's verdict; the debounce lives in the UI.
export const checkUsername = async (
  username: string,
): Promise<{ available: boolean; reason: string | null }> => {
  const { body } = await authFetch("/api/auth/username-available", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username }),
  });
  return {
    available: body.available === true,
    reason: typeof body.reason === "string" ? body.reason : null,
  };
};
