import { useCallback, useEffect, useState } from "react";

import {
  AuthError,
  checkUsername,
  clearSessionKey,
  createAccount,
  createVault,
  fetchSession,
  logoutSession,
  restore,
  unlock,
} from "../helpers/index.js";
import type { AuthErrorCode, AuthStatus } from "../types/index.js";

// The auth state machine (CDC §7.2). On mount it probes the session once, then
// falls back to the vault to tell locked from anonymous. Actions wrap the service
// operations and fold their outcome into the state; the private key never lives
// here, only in the sessionKey closure the helpers own.
export const useAuthStore = () => {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<AuthErrorCode | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const session = await fetchSession();
      if (!alive) return;
      if (session) {
        setUsername(session.username);
        setStatus("authenticated");
        return;
      }
      const hasVault = await createVault().exists();
      if (!alive) return;
      setStatus(hasVault ? "locked" : "anonymous");
    })();
    return () => {
      alive = false;
    };
  }, []);

  const run = useCallback(async (op: () => Promise<{ username: string }>): Promise<string> => {
    setBusy(true);
    setError(null);
    try {
      const result = await op();
      setUsername(result.username);
      setStatus("authenticated");
      return result.username;
    } catch (err) {
      setError(err instanceof AuthError ? err.code : "server");
      throw err;
    } finally {
      setBusy(false);
    }
  }, []);

  return {
    status,
    username,
    error,
    busy,
    checkUsername,
    createAccount: useCallback(
      (input: { mnemonic: string; username: string; password: string }) =>
        run(() => createAccount(input)),
      [run],
    ),
    unlock: useCallback((password: string) => run(() => unlock(password)), [run]),
    restore: useCallback(
      (input: { mnemonic: string; password: string }) => run(() => restore(input)),
      [run],
    ),
    logout: useCallback(async () => {
      await logoutSession();
      const hasVault = await createVault().exists();
      setStatus(hasVault ? "locked" : "anonymous");
    }, []),
    erase: useCallback(async () => {
      await createVault().clear();
      clearSessionKey();
      setUsername(null);
      setStatus("anonymous");
    }, []),
  };
};
