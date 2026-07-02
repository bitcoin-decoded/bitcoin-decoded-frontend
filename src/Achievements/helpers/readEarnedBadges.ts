import { BADGE_BY_ID, BADGES_STORAGE_KEY } from "../data";
import type { EarnedBadges } from "../types";

export const readEarnedBadges = (): EarnedBadges => {
  try {
    const raw = localStorage.getItem(BADGES_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || typeof parsed !== "object") return {};
    const out: EarnedBadges = {};
    for (const [id, at] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof at === "number" && BADGE_BY_ID.has(id)) out[id] = at;
    }
    return out;
  } catch {
    return {};
  }
};
