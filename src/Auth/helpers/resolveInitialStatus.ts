import type { AuthStatus } from "../types/index.js";

// The return-to-app decision (CDC §7.2), kept pure so the locked-vs-anonymous
// rule is pinned by a test: a live session opens the app; otherwise a vault on
// this device means "locked" (ask the password), and no vault means the landing.
export const resolveInitialStatus = (
  session: { username: string } | null,
  hasVault: boolean,
): AuthStatus => (session ? "authenticated" : hasVault ? "locked" : "anonymous");
