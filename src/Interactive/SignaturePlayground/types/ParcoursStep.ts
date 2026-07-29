import type { ParcoursStepStatus } from "./ParcoursStepStatus";

export type ParcoursStep = {
  label: string;
  status: ParcoursStepStatus;
  note?: string;
};
