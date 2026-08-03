import { createContext, useContext } from "react";

import type { UserDataValue } from "../types";

export const UserDataContext = createContext<UserDataValue | null>(null);

export const useUserData = (): UserDataValue => {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within a UserDataProvider");
  return ctx;
};
