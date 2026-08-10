// Client mirror of the server rule: 3 to 20 letters and digits only, after
// lowercasing. No special characters (so "---" cannot be a name). The server
// stays the source of truth on availability; this only gates the UI so an
// obviously malformed pseudo never triggers a request.
export const validateUsername = (raw: string): boolean =>
  /^[a-z0-9]{3,20}$/.test(raw.trim().toLowerCase());
