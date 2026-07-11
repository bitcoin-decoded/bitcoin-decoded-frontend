import type { ComponentType } from "react";

/**
 * A term marker — either a Phosphor line icon (@icons) or a doodle glyph
 * (@doodle). Both accept `size` / `strokeWidth`, so the card renders either.
 */
export type TermIcon = ComponentType<{ size?: number; strokeWidth?: number | string }>;
