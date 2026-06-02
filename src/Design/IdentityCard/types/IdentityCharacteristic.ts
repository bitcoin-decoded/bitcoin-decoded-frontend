import type { ReactNode } from "react";

export type IdentityCharacteristic = {
  label: string;
  value: ReactNode;
  /** Optional icon shown next to the label (e.g. a lucide glyph). */
  icon?: ReactNode;
};