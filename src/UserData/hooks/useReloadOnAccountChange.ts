import { useEffect, useRef } from "react";

import { useAuth } from "../../Auth/hooks";
import { resolveAccountReload } from "../helpers";

// Bridges the auth state machine to the composite repository. When the session
// flips during the visit, the source must be re-selected: a fresh create/unlock
// brings a session, so reload to fetch the account (and run the first-login
// migration); a logout drops it, so reload to fall back to the local copy. The
// decision (including the no-op first settle) lives in resolveAccountReload.
export const useReloadOnAccountChange = (reload: () => void): void => {
  const { status } = useAuth();
  const authenticated = status === "authenticated";
  const settled = useRef<boolean | null>(null);

  useEffect(() => {
    if (status === "checking") return;
    const next = resolveAccountReload(settled.current, authenticated);
    settled.current = next.settled;
    if (next.shouldReload) reload();
  }, [authenticated, status, reload]);
};
