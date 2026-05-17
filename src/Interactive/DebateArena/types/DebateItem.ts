import type { DebateSide } from "./DebateSide";

export type DebateItem = {
  topic: string;
  sides: [DebateSide, DebateSide];
};
