import { type FC, type ReactNode } from "react";

import type { Language } from "../../I18n";
import { useRouter } from "../hooks/useRouter";
import type { RouteName } from "../types/RouteName";

import { RouterContext } from ".";

type Props = {
  children: ReactNode;
  /** Set by the build, which renders one file per route and language. */
  route?: RouteName;
  language?: Language;
};

export const RouterProvider: FC<Props> = ({ children, route, language }) => {
  const value = useRouter(route, language);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};
