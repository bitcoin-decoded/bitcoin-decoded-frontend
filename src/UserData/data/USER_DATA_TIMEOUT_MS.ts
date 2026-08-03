// How long the initial load may take before we stop the spinner and show an
// error with a retry. Generous: localStorage resolves instantly, this exists
// for the day the source is a network call that hangs.
export const USER_DATA_TIMEOUT_MS = 8000;
