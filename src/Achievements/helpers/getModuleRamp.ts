import type { BadgeModule } from "../types";

/** Maps a badge's module to its theme color ramp (Banking blue / Lois violet / Bitcoin amber). */
export const getModuleRamp = (module: BadgeModule): "blue" | "violet" | "amber" => {
  if (module === "banking") return "blue";
  if (module === "moneyLaws") return "violet";
  return "amber";
};
