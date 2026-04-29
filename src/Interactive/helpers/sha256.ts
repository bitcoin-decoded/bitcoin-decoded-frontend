export const sha256 = async (message: string): Promise<string> => {
  const data = new TextEncoder().encode(message);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const doubleSha256 = async (message: string): Promise<string> =>
  sha256(await sha256(message));
