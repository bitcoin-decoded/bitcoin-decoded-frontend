import { type FC, type ReactNode } from "react";

import { AboutContext, useAboutStore } from "../hooks";

import { AboutModal } from "./AboutModal";

// Provides the About open/close state to the header and footer entry points and
// mounts the modal itself, so both triggers drive the same modal.
export const AboutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useAboutStore();

  return (
    <AboutContext.Provider value={value}>
      {children}
      <AboutModal />
    </AboutContext.Provider>
  );
};
