import type { ReactNode } from "react";

import type { TermIcon } from "./TermIcon";

export type ExpandableTerm = {
  key: string;
  title: string;
  summary: ReactNode | string;
  body: ReactNode;
  icon: TermIcon;
  accentText: string;
  accentBorder: string;
  meta?: ReactNode;
};
