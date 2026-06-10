import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ExpandableTerm = {
  key: string;
  title: string;
  summary: ReactNode | string;
  body: ReactNode;
  icon: LucideIcon;
  accentText: string;
  accentBorder: string;
  meta?: ReactNode;
};
