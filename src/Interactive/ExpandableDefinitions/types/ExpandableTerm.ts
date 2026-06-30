import type { ReactNode } from "react";

import type { IconType } from "@icons";

export type ExpandableTerm = {
  key: string;
  title: string;
  summary: ReactNode | string;
  body: ReactNode;
  icon: IconType;
  accentText: string;
  accentBorder: string;
  meta?: ReactNode;
};
