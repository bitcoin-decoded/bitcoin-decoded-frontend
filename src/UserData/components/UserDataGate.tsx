import { type FC, type ReactNode } from "react";

import { isBrowser } from "../../Platform";
import { useUserData } from "../hooks";

import { UserDataError } from "./UserDataError";
import { UserDataLoader } from "./UserDataLoader";

// Decides what the client shows around the init lifecycle. On the server the
// content is rendered as-is (the prerender is the SEO snapshot and first paint);
// user-specific widgets keep themselves out of it by gating on `status`.
export const UserDataGate: FC<{ children: ReactNode }> = ({ children }) => {
  const { status, retry } = useUserData();

  if (!isBrowser) return <>{children}</>;
  if (status === "loading") return <UserDataLoader />;
  if (status === "error") return <UserDataError onRetry={retry} />;
  return <>{children}</>;
};
