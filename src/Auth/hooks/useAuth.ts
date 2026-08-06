import { createContext, useContext } from "react";

import type { useAuthStore } from "./useAuthStore.js";

// The auth context carries exactly what the store returns. Consumers read it with
// useAuth; it throws outside an AuthProvider so a missing mount fails loudly.
export type AuthContextValue = ReturnType<typeof useAuthStore>;

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within an AuthProvider");
  return value;
};
