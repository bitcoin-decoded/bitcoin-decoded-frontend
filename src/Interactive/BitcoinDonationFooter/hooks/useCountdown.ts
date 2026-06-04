import { useEffect, useState } from "react";

/** A mm:ss countdown to `expiresAt` (epoch ms). Returns "" when no target. */
export const useCountdown = (expiresAt: number | null) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiresAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [expiresAt]);

  if (!expiresAt) return { mmss: "", isExpired: false };

  const remainingMs = Math.max(0, expiresAt - now);
  const totalSec = Math.floor(remainingMs / 1000);
  const mm = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const ss = String(totalSec % 60).padStart(2, "0");
  return { mmss: `${mm}:${ss}`, isExpired: remainingMs <= 0 };
};
