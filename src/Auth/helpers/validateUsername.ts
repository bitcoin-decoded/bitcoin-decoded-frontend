// Client mirror of the server rule (CDC §6): 3 to 20 chars, [a-z0-9_-], after
// lowercasing. The server stays the source of truth on availability; this only
// gates the UI so an obviously malformed pseudo never triggers a request.
export const validateUsername = (raw: string): boolean =>
  /^[a-z0-9_-]{3,20}$/.test(raw.trim().toLowerCase());
