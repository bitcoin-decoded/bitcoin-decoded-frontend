import type { ArrivalAnchor, ChapterState } from "../types";

export const getArrivalAnchor = (
  state: ChapterState,
  lastVisitedBlock: number | null,
): ArrivalAnchor =>
  state === "inProgress" && lastVisitedBlock !== null
    ? { type: "block", index: lastVisitedBlock }
    : { type: "top" };
