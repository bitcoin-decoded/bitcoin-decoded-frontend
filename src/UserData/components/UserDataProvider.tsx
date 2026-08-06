import { type FC, type ReactNode, useMemo } from "react";

import { createDefaultRepository } from "../helpers";
import { UserDataContext, useReloadOnAccountChange, useUserDataStore } from "../hooks";
import type { UserRepository } from "../types";

import { UserDataGate } from "./UserDataGate";

type Props = {
  children: ReactNode;
  // Override the source if ever needed; the default is already the composite
  // (local for a guest, the account API once this device has one).
  repository?: UserRepository;
};

export const UserDataProvider: FC<Props> = ({ children, repository }) => {
  const resolved = useMemo(() => repository ?? createDefaultRepository(), [repository]);
  const value = useUserDataStore(resolved);
  useReloadOnAccountChange(value.retry);

  return (
    <UserDataContext.Provider value={value}>
      <UserDataGate>{children}</UserDataGate>
    </UserDataContext.Provider>
  );
};
