import { createContext } from "react";
import type { RouterContextState } from "../types/RouterContextState";

export const RouterContext = createContext<RouterContextState | undefined>(
  undefined
);
