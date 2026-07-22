import { type CSSProperties, type FC } from "react";

import { useQrDataUrl } from "../hooks";

type Props = {
  value: string;
  ariaLabel: string;
  size?: number;
};

export const DonationQrCode: FC<Props> = ({ value, ariaLabel, size = 200 }) => {
  const { dataUrl, error } = useQrDataUrl(value);

  if (error || !dataUrl) return null;

  const frameStyle: CSSProperties = {
    background: "#ffffff",
    padding: "0.6rem",
    borderRadius: 0,
    display: "inline-flex",
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
        style={{ display: "block", width: size, height: size, borderRadius: 0 }}
      />
    </div>
  );
};
