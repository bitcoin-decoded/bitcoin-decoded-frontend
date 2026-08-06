// The device's backup bookkeeping (CDC §5.1): when the vault was last exported to
// a .bdw file, and how many times the "download your backup" reminder has been
// dismissed (capped so it goes silent, CDC §7.6).
export type BackupMeta = {
  exportedAt: string | null;
  remindersDismissed: number;
};
