import type { VaultContainer } from "../types/index.js";

import { createVault } from "./createVault.js";
import { unlock } from "./unlock.js";

// Import a .bdw backup (CDC §7.4): drop the already-encrypted container into the
// device vault, then unlock it exactly like a normal return. Reusing unlock keeps
// a single decrypt-derive-login path, so a wrong password fails there, uniformly.
export const importAccount = async (
  container: VaultContainer,
  password: string,
): Promise<{ username: string }> => {
  await createVault().save(container);
  return unlock(password);
};
