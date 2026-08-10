import type { AuthErrorCode } from "../types/index.js";

// The generic error-code to editorial-key mapping (CDC §14.12). Context-specific
// codes (username_taken, wrong_password, account_not_found, invalid_phrase) are
// shown inline by the screen that owns them; every other failure is a network
// problem or an our-side problem, and lands here. The two literals are valid
// translation keys, so callers pass the result straight to t() without a cast.
export const authErrorKey = (code: AuthErrorCode): "auth.errors.network" | "auth.errors.server" =>
  code === "network" ? "auth.errors.network" : "auth.errors.server";
