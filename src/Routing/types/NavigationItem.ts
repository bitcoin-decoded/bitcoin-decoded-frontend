import type { JSX } from "react";

import { type RouteName } from "./RouteName";

export type NavigationItem = {
  id?: RouteName;
  label: string;
  isPage: boolean;
  icon?: JSX.Element;
  /**
   * Semantic chapter type. Used by the nav to render a visual marker
   * for non-prose chapters (e.g. the end-of-module knowledge checks).
   */
  kind?: "challenge";
  children?: NavigationItem[];
};
