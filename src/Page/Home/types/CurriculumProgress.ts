import type { CurriculumCard } from "./CurriculumCard";
import type { CurriculumResume } from "./CurriculumResume";

export type CurriculumProgress = {
  cards: CurriculumCard[];
  moduleCount: number;
  totalChapters: number;
  totalMinutes: number;
  hasProgress: boolean;
  resume: CurriculumResume | null;
};
