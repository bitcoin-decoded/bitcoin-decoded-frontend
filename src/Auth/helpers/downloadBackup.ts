import { buildVaultExport } from "./buildVaultExport.js";
import { createVault } from "./createVault.js";

// Trigger the .bdw download in the browser (CDC §7.5) and record the export in
// meta so the backup reminder (§7.6) stays quiet afterwards. The container is
// loaded straight from the vault — it is already the on-disk format, no
// re-encryption. Returns false when there is nothing to export.
export const downloadBackup = async (): Promise<boolean> => {
  const container = await createVault().load();
  if (!container) return false;

  const { filename, content } = buildVaultExport(container);
  const blob = new Blob([content], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);

  const meta = (await createVault().getBackupMeta()) ?? { exportedAt: null, remindersDismissed: 0 };
  await createVault().setBackupMeta({ ...meta, exportedAt: new Date().toISOString() });
  return true;
};
