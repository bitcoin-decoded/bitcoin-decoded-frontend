import type { UserData } from "../types";

import { toProgressItems } from "./toProgressItems";

// One awaitable write of the whole snapshot to the account. `keepalive` lets it
// still complete when fired from a pagehide flush. Shared by the API
// repository's debounced save and the first-login migration push.
export const pushProgress = async (data: UserData): Promise<void> => {
  const res = await fetch("/api/progress", {
    method: "POST",
    credentials: "include",
    keepalive: true,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ items: toProgressItems(data) }),
  });
  if (!res.ok) throw new Error(`POST /api/progress ${res.status}`);
};
