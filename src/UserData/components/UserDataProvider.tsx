import { type FC, type ReactNode, useMemo } from "react";

import { createLocalRepository } from "../helpers";
import { UserDataContext, useUserDataStore } from "../hooks";
import type { UserRepository } from "../types";

import { UserDataGate } from "./UserDataGate";

type Props = {
  children: ReactNode;
  // The one thing to change when the source moves to a backend: pass an API
  // repository here instead of the localStorage default.
  repository?: UserRepository;
};

export const UserDataProvider: FC<Props> = ({ children, repository }) => {
  const resolved = useMemo(() => repository ?? createLocalRepository(), [repository]);
  const value = useUserDataStore(resolved);

  return (
    <UserDataContext.Provider value={value}>
      <UserDataGate>{children}</UserDataGate>
    </UserDataContext.Provider>
  );
};
