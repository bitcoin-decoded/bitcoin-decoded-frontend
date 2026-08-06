// A coded reason the UI maps to editorial text (CDC §14/§15); a raw trace is
// never surfaced. Kept as a union (no enum, per the project's conventions).
export type AuthErrorCode =
  | "network"
  | "server"
  | "rate_limited"
  | "challenge_invalid"
  | "signature_invalid"
  | "account_not_found"
  | "username_taken"
  | "wrong_password"
  | "no_vault"
  | "invalid_phrase";
