import type { BadgeModule } from "../types";

export const getModuleRamp = (module: BadgeModule): "blue" | "violet" | "amber" => {
  if (module === "banking") return "blue";
  if (module === "moneyLaws") return "violet";
  return "amber";
};
