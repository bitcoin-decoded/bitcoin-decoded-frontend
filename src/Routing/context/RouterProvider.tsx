import { type FC, type ReactNode } from "react";
import { RouterContext } from ".";
import { useRouter } from "../hooks/useRouter";

export const RouterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useRouter();

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};
