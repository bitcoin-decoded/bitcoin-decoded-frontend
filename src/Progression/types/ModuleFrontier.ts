import type { RouteName } from "../../Routing";

/** How far the way is open into one module. */
export type ModuleFrontier = {
  /** The module's chapters, in reading order. */
  chapters: RouteName[];
  /** Index of the deepest chapter the reader may open. */
  frontierIndex: number;
  /** The chapter at that index, which is what an out-of-order reader is offered. */
  frontierId: RouteName;
};
