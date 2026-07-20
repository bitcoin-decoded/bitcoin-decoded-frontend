import { type FC, type ReactNode } from "react";

import { useRouter } from "../hooks/useRouter";
import type { RouteName } from "../types/RouteName";

import { RouterContext } from ".";

type Props = {
  children: ReactNode;
  /** Set by the build, which renders one file per route and has no address to read. */
  route?: RouteName;
};

export const RouterProvider: FC<Props> = ({ children, route }) => {
  const value = useRouter(route);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};
