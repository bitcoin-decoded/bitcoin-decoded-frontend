import { type CSSProperties, type FC } from "react";

import { useQrDataUrl } from "../hooks";

type Props = {
  value: string;
  ariaLabel: string;
  size?: number;
};

/**
 * Client-side QR, always dark-on-white (so it scans in dark mode too). Returns
 * null if generation fails - the caller then shows the text + copy fallback
 * (spec §10), never blocking.
 */
export const DonationQrCode: FC<Props> = ({ value, ariaLabel, size = 200 }) => {
  const { dataUrl, error } = useQrDataUrl(value);

  if (error || !dataUrl) return null;

  const frameStyle: CSSProperties = {
    background: "#ffffff",
    padding: "0.6rem",
    borderRadius: "0.85rem",
    display: "inline-flex",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.18)",
    animation: "donationFade 300ms var(--ease-smooth) both",
  };

  return (
    <div style={frameStyle}>
      <img
        src={dataUrl}
        alt=""
        role="img"
        aria-label={ariaLabel}
        width={size}
        height={size}
        style={{ display: "block", width: size, height: size, borderRadius: "0.25rem" }}
      />
    </div>
  );
};
