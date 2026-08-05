import { isBrowser } from "../../Platform";
import { PROGRESS_SAVE_DEBOUNCE_MS } from "../data";
import type { ProgressItem, UserData, UserRepository } from "../types";

import { fromProgressItems } from "./fromProgressItems";
import { pushProgress } from "./pushProgress";
import { SessionExpiredError } from "./SessionExpiredError";

// The backend implementation of the user repository. `load` reads the account's
// progress (a 401 becomes SessionExpiredError so the composite can react);
// `save` is debounced, with a flush on pagehide so the last state is never lost.
export const createApiRepository = (): UserRepository => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let pending: UserData | null = null;

  const flush = (): void => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (!pending) return;
    const data = pending;
    pending = null;
    void pushProgress(data).catch(() => {
      // A dropped save is not fatal: the next change reschedules one, and the
      // server merge is non-regressive so nothing is lost by retrying.
    });
  };

  if (isBrowser) {
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });
  }

  return {
    load: async (signal) => {
      const res = await fetch("/api/progress", { credentials: "include", signal });
      if (res.status === 401) throw new SessionExpiredError();
      if (!res.ok) throw new Error(`GET /api/progress ${res.status}`);
      const body = (await res.json()) as { items?: unknown };
      return fromProgressItems(Array.isArray(body.items) ? (body.items as ProgressItem[]) : []);
    },
    save: (data) => {
      pending = data;
      if (timer) clearTimeout(timer);
      timer = setTimeout(flush, PROGRESS_SAVE_DEBOUNCE_MS);
    },
  };
};
