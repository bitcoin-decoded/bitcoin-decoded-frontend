import type { JSX } from "react";

import { type RouteName } from "./RouteName";

export type NavigationItem = {
  id?: RouteName;
  label: string;
  isPage: boolean;
  icon?: JSX.Element;
  kind?: "challenge";
  children?: NavigationItem[];
};
