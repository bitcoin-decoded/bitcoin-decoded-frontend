import type { CurriculumModuleMeta } from "../types";

// Presentation metadata per module, in the same order the navigation tree lists
// them (banking, money laws, bitcoin). The chapter membership itself is derived
// from the tree at runtime, so this file never duplicates the chapter list.
export const CURRICULUM_MODULES: CurriculumModuleMeta[] = [
  { nameKey: "home.curriculum.module1.name", theme: "blue" },
  { nameKey: "home.curriculum.module2.name", theme: "violet" },
  { nameKey: "home.curriculum.module3.name", theme: "amber" },
];
