import { useContext } from "react";

import { RouterContext } from "../context";
import type { RouterContextState } from "../types";

export const useRouterContext = (): RouterContextState => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error("useRouterContext must be used within a RouterProvider");
  }
  return context;
};
