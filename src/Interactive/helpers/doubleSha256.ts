import { sha256 } from "./sha256";

export const doubleSha256 = async (message: string): Promise<string> =>
  sha256(await sha256(message));
