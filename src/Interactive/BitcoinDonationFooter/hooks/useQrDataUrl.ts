import { useEffect, useState } from "react";

import { toDataURL } from "qrcode";

export const useQrDataUrl = (text: string) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!text) {
      setDataUrl(null);
      return;
    }
    let alive = true;
    setError(false);
    toDataURL(text, {
      margin: 1,
      width: 320,
      errorCorrectionLevel: "M",
      color: { dark: "#000000", light: "#ffffff" },
    })
      .then((url) => {
        if (alive) setDataUrl(url);
      })
      .catch(() => {
        if (alive) setError(true);
      });
    return () => {
      alive = false;
    };
  }, [text]);

  return { dataUrl, error };
};
