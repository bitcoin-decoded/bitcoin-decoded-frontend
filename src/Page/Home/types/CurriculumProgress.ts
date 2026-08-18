import type { CurriculumCard } from "./CurriculumCard";
import type { CurriculumResume } from "./CurriculumResume";

export type CurriculumProgress = {
  cards: CurriculumCard[];
  moduleCount: number;
  totalChapters: number;
  totalMinutes: number;
  resume: CurriculumResume | null;
};
