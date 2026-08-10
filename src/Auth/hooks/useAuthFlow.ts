import { createContext, useContext } from "react";

import type { useAuthFlowStore } from "./useAuthFlowStore.js";

// The onboarding flow context carries exactly what the flow store returns. It is
// mounted above UserDataProvider so the overlay survives the post-login reload
// (the gate blanks its children while UserData reloads). Throws outside its
// provider so a missing mount fails loudly.
export type AuthFlowContextValue = ReturnType<typeof useAuthFlowStore>;

export const AuthFlowContext = createContext<AuthFlowContextValue | null>(null);

export const useAuthFlow = (): AuthFlowContextValue => {
  const value = useContext(AuthFlowContext);
  if (!value) throw new Error("useAuthFlow must be used within an AuthFlowProvider");
  return value;
};
