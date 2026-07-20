import { type FC, type ReactNode } from "react";

import { useRouter } from "../hooks/useRouter";

import { RouterContext } from ".";

export const RouterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useRouter();

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};
