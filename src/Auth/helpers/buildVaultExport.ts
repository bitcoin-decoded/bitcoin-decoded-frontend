import type { VaultContainer } from "../types/index.js";

// The .bdw download (CDC §7.5). The container is already the on-disk format, so
// the file is just its JSON; the name carries the pseudo and the export date. The
// date is a parameter so the filename is testable without freezing the clock.
export const buildVaultExport = (
  container: VaultContainer,
  date: Date = new Date(),
): { filename: string; content: string } => ({
  filename: `bitcoin-decoded-${container.username}-${date.toISOString().slice(0, 10)}.bdw`,
  content: JSON.stringify(container, null, 2),
});
