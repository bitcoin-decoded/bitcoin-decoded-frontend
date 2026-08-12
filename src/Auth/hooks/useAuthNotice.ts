import { useCallback, useEffect, useRef, useState } from "react";

import { createVault, downloadBackup, probeStorageAvailable } from "../helpers/index.js";
import type { BackupMeta } from "../types/index.js";

import { useAuth } from "./useAuth.js";

type AuthNoticeKind = "storageUnavailable" | "backupReminder" | null;

// CDC §7.6: the reminder appears on the 3rd distinct session, at most 3 times.
const REMINDER_AT_SESSION = 3;
const MAX_REMINDERS = 3;

// A distinct session = a distinct app load. The count is device-local UI
// bookkeeping (not a secret, not identity), so it lives in localStorage, outside
// the fixed IndexedDB meta shape (§5.1).
const SESSION_COUNT_KEY = "bd.auth.sessionCount";

// Drives the non-modal notices that live outside the overlay (CDC §7.6 backup
// reminder, §9 storage unavailable). Reads auth status, never mirrors it.
export const useAuthNotice = () => {
  const { status } = useAuth();

  const [storageAvailable, setStorageAvailable] = useState(true);
  const [backupMeta, setBackupMeta] = useState<BackupMeta | null>(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const countedRef = useRef(false);
  const shownCountedRef = useRef(false);

  // Probe persistence once at startup (§9): a defined indexedDB is not proof it
  // works, so we attempt a real read.
  useEffect(() => {
    void probeStorageAvailable().then(setStorageAvailable);
  }, []);

  // On the first authenticated settle of this load, count the session and read the
  // backup bookkeeping. Erasing (-> anonymous) resets the counter so a fresh
  // account created later starts its own session tally.
  useEffect(() => {
    if (status === "authenticated" && !countedRef.current) {
      countedRef.current = true;
      const stored = typeof localStorage === "undefined" ? 0 : Number(localStorage.getItem(SESSION_COUNT_KEY));
      const next = (Number.isFinite(stored) ? stored : 0) + 1;
      if (typeof localStorage !== "undefined") localStorage.setItem(SESSION_COUNT_KEY, String(next));
      setSessionCount(next);
      void createVault().getBackupMeta().then(setBackupMeta);
    }
    if (status === "anonymous") {
      countedRef.current = false;
      if (typeof localStorage !== "undefined") localStorage.removeItem(SESSION_COUNT_KEY);
      setBackupMeta(null);
    }
  }, [status]);

  const backupReminder =
    status === "authenticated" &&
    storageAvailable &&
    backupMeta !== null &&
    !backupMeta.exportedAt &&
    sessionCount >= REMINDER_AT_SESSION &&
    backupMeta.remindersDismissed < MAX_REMINDERS;

  const notice: AuthNoticeKind = dismissed
    ? null
    : status === "authenticated" && !storageAvailable
      ? "storageUnavailable"
      : backupReminder
        ? "backupReminder"
        : null;

  // The CDC caps the reminder at 3 *affichages* (meta.remindersDismissed), so the
  // count is spent when it is shown — once per session — not when it is dismissed.
  // Otherwise a reader who never clicks "Later" would see it every session forever.
  // The persisted value is bumped but the in-session backupMeta is left untouched,
  // so the banner stays visible through the session it is counted in.
  useEffect(() => {
    if (notice === "backupReminder" && backupMeta && !shownCountedRef.current) {
      shownCountedRef.current = true;
      void createVault().setBackupMeta({
        ...backupMeta,
        remindersDismissed: backupMeta.remindersDismissed + 1,
      });
    }
  }, [notice, backupMeta]);

  // "Download now": exporting stamps meta.exportedAt, which silences the reminder
  // for good; hide it for this session too.
  const download = useCallback(async () => {
    await downloadBackup();
    setDismissed(true);
  }, []);

  // "Later" / the storage warning's ✕: hide for this session. The reminder's show
  // was already counted above, so nothing to persist here.
  const dismiss = useCallback(() => setDismissed(true), []);

  return { notice, download, dismiss };
};
