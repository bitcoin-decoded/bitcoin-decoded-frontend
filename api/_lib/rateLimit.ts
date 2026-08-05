// Best-effort, per-instance sliding window: enough to blunt basic hammering of
// the auth routes at this scale (CDC 6, no distributed store). Keyed by the
// opaque client hash from clientKey, so no raw address is ever held here.
const WINDOW_MS = 60_000;
const LIMIT = 20;

const hits = new Map<string, number[]>();

export const allowRequest = (key: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
};
