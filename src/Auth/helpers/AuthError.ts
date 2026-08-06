import type { AuthErrorCode } from "../types/index.js";

// The one error type the auth operations throw. Its `code` is what the UI
// switches on to pick editorial text; the message is only for logs/tests. No
// parameter property (erasableSyntaxOnly).
export class AuthError extends Error {
  readonly code: AuthErrorCode;
  constructor(code: AuthErrorCode) {
    super(code);
    this.name = "AuthError";
    this.code = code;
  }
}
