import type { RailStep } from "../types";

// The five rungs of the descent, top to bottom. The middle three share their ids
// with INSIGHT_STEPS so the scroll-spy lights the right rung; "top" and "final"
// are the hero and the course door.
export const RAIL_STEPS: RailStep[] = [
  { id: "top", labelKey: "home.rail.top" },
  { id: "value", labelKey: "home.rail.value" },
  { id: "control", labelKey: "home.rail.control" },
  { id: "network", labelKey: "home.rail.network" },
  { id: "final", labelKey: "home.rail.final" },
];
