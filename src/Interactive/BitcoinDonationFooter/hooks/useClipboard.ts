import { useCallback, useState } from "react";

export const useClipboard = (resetMs = 1500) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.setTimeout(() => setCopied(false), resetMs);
      } catch {
        // Clipboard API blocked (rare) - silently no-op.
      }
    },
    [resetMs],
  );

  return { copied, copy };
};
