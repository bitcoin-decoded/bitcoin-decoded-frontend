import type { IconComponent } from "@icons";

/** One rung of the production chain, from the final good back to its origin. */
export type ProductionStep = {
  id: string;
  /** Component, not an element — the card owns the size, so every step's glyph
   *  renders identically and responsively. (These were emoji before.) */
  icon: IconComponent;
  title: string;
  text: string;
};
