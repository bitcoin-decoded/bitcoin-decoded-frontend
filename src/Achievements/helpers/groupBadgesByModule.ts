import type { Badge, BadgeModule } from "../types";

const ORDER: BadgeModule[] = ["banking", "moneyLaws", "bitcoin"];

export const groupBadgesByModule = (badges: Badge[]): { module: BadgeModule; badges: Badge[] }[] =>
  ORDER.map((module) => ({ module, badges: badges.filter((b) => b.module === module) })).filter(
    (group) => group.badges.length > 0,
  );
