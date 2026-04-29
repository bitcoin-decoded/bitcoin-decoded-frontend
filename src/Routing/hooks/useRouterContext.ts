import { useContext } from "react";
import type { RouterContextState } from "../types";
import { RouterContext } from "../context";

export const useRouterContext = (): RouterContextState => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }
  return context;
};
