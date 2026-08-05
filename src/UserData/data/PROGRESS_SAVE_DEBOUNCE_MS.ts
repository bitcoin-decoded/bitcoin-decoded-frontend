// Reading progress is written on every block change; debounce the network save
// so a burst of quick reveals collapses into one request. A pagehide flush still
// sends the last state immediately.
export const PROGRESS_SAVE_DEBOUNCE_MS = 1500;
