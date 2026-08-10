import { type FC, type ReactNode } from "react";

import { AuthFlowContext, useAuthFlowStore } from "../hooks";

import { AuthScreens } from "./AuthScreens";

// Mounts the onboarding flow store and shares it, and hosts the overlay it drives.
// Sits above UserDataProvider so the overlay is not torn down when the data gate
// blanks the app during the post-login reload. `detectLocalProgress` is injected
// by the app root so this domain never imports UserData.
export const AuthFlowProvider: FC<{
  children: ReactNode;
  detectLocalProgress: () => boolean;
}> = ({ children, detectLocalProgress }) => (
  <AuthFlowContext.Provider value={useAuthFlowStore(detectLocalProgress)}>
    {children}
    <AuthScreens />
  </AuthFlowContext.Provider>
);
