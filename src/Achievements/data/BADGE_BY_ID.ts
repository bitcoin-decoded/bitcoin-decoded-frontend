import { BADGES } from "./BADGES";

export const BADGE_BY_ID = new Map(BADGES.map((b) => [b.id, b] as const));
