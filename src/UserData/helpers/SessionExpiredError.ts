// Thrown by the API repository on a 401 so the composite can tell an expired or
// absent session (fall back to local, and later prompt an unlock) from a genuine
// network or server failure (which must surface on the init error screen).
export class SessionExpiredError extends Error {
  constructor() {
    super("session_expired");
    this.name = "SessionExpiredError";
  }
}
