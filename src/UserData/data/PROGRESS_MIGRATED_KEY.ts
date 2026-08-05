// Set after the one-time push of this device's local (guest) progress into the
// account on the first authenticated load, so the migration never runs twice.
export const PROGRESS_MIGRATED_KEY = "bd:migrated";
