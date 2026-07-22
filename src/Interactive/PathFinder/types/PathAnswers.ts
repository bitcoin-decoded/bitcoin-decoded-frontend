import type { PathTier } from "./PathTier";

export type PathAnswers = {
  capital: PathTier | null;
  frequency: "single" | "dca" | null;
  custody: "simple" | "sovereign" | "unsure" | null;
  privacy: "discreet" | "dontcare" | null;
};
