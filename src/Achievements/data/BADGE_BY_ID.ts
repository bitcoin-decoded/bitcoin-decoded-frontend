import { BADGES } from "./BADGES";

/** Lookup index over BADGES, keyed by badge id. */
export const BADGE_BY_ID = new Map(BADGES.map((b) => [b.id, b] as const));
