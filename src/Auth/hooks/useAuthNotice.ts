import { useCallback, useEffect, useRef, useState } from "react";

import { createVault, downloadBackup, nextActiveDays } from "../helpers/index.js";
import type { BackupMeta } from "../types/index.js";

import { useAuth } from "./useAuth.js";

type AuthNoticeKind = "backupReminder" | null;

// CDC v1.3 §7.6: the reminder starts on the 3rd distinct *day* of use and shows at
// most 3 times (once per day), then stays silent. A distinct day, not a distinct
// app load, so testing the app with a few reloads does not burn the reminders
// before there is any progress worth protecting.
const REMINDER_AT_DAY = 3;
const MAX_REMINDERS = 3;

// Distinct-day bookkeeping lives in localStorage (device-local UI state, not a
// secret), because the §5.1 IndexedDB meta shape is fixed to
// {exportedAt, remindersDismissed} and must not grow.
const ACTIVE_DAYS_KEY = "bd.auth.activeDays";
const LAST_ACTIVE_DAY_KEY = "bd.auth.lastActiveDay";

// Drives the non-modal backup reminder (CDC §7.6), which lives outside the overlay.
// Reads auth status, never mirrors it. Storage-unavailable (§9) is not handled here:
// v1.4 blocks account creation in private browsing at the landing, so an
// authenticated reader always has working storage.
export const useAuthNotice = () => {
  const { status } = useAuth();

  const [backupMeta, setBackupMeta] = useState<BackupMeta | null>(null);
  const [activeDays, setActiveDays] = useState(0);
  const [isNewDay, setIsNewDay] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const countedRef = useRef(false);
  const shownCountedRef = useRef(false);

  // On the first authenticated settle of this load, fold today into the distinct-day
  // tally and read the backup bookkeeping. Erasing (-> anonymous) resets the tally
  // so a fresh account starts its own count.
  useEffect(() => {
    if (status === "authenticated" && !countedRef.current) {
      countedRef.current = true;
      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      const hasLs = typeof localStorage !== "undefined";
      const stored = hasLs ? Number(localStorage.getItem(ACTIVE_DAYS_KEY)) : 0;
      const lastDay = hasLs ? localStorage.getItem(LAST_ACTIVE_DAY_KEY) : null;
      const { days, isNewDay: fresh } = nextActiveDays(stored, lastDay, today);
      if (hasLs && fresh) {
        localStorage.setItem(ACTIVE_DAYS_KEY, String(days));
        localStorage.setItem(LAST_ACTIVE_DAY_KEY, today);
      }
      setActiveDays(days);
      setIsNewDay(fresh);
      void createVault().getBackupMeta().then(setBackupMeta);
    }
    if (status === "anonymous") {
      countedRef.current = false;
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(ACTIVE_DAYS_KEY);
        localStorage.removeItem(LAST_ACTIVE_DAY_KEY);
      }
      setBackupMeta(null);
    }
  }, [status]);

  // Shown once per new day (isNewDay), from the 3rd distinct day, capped at 3 total.
  const backupReminder =
    status === "authenticated" &&
    isNewDay &&
    backupMeta !== null &&
    !backupMeta.exportedAt &&
    activeDays >= REMINDER_AT_DAY &&
    backupMeta.remindersDismissed < MAX_REMINDERS;

  const notice: AuthNoticeKind = !dismissed && backupReminder ? "backupReminder" : null;

  // Each appearance spends one of the three (meta.remindersDismissed). The banner
  // only appears on a new day, so this is at most once per day. Persisted only; the
  // in-session value is left as loaded so the banner stays up through this session.
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

  // "Later": hide for this session. The reminder's show was already counted above.
  const dismiss = useCallback(() => setDismissed(true), []);

  return { notice, download, dismiss };
};
