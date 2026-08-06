import { type FC, type ReactNode } from "react";

import { AuthContext, useAuthStore } from "../hooks";

// Mounts the auth state machine and shares it. Mounted by the app in Phase 4d
// (above the reading UI); until then the runtime is complete but unmounted, so
// nothing in the app calls useAuth yet.
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <AuthContext.Provider value={useAuthStore()}>{children}</AuthContext.Provider>
);
