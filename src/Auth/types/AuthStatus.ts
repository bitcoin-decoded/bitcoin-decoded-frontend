// The device's auth state (drives the return-to-app flow, CDC §7.2):
//   checking      — probing the session on load
//   authenticated — session cookie valid, app open, no interaction
//   locked        — a vault exists but the session is gone → ask the password
//   anonymous     — no vault on this device → landing (create / restore)
export type AuthStatus = "checking" | "authenticated" | "locked" | "anonymous";
