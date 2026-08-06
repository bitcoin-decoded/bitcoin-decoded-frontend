import { AuthError } from "./AuthError.js";

// Every auth call is same-origin and carries the session cookie. A transport
// failure becomes a coded AuthError; otherwise the caller gets the status and
// parsed body to branch on the server's own coded responses.
export const authFetch = async (
  path: string,
  init?: RequestInit,
): Promise<{ status: number; body: Record<string, unknown> }> => {
  let res: Response;
  try {
    res = await fetch(path, { credentials: "include", ...init });
  } catch {
    throw new AuthError("network");
  }
  let body: Record<string, unknown> = {};
  try {
    body = (await res.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }
  return { status: res.status, body };
};
