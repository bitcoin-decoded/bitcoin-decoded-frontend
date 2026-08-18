import { type CSSProperties, type FC } from "react";

type Props = {
  color: string;
  size?: number;
};

const CORNERS = [
  { top: true, left: true },
  { top: true, right: true },
  { bottom: true, left: true },
  { bottom: true, right: true },
] as const;

// Four right-angle registration marks at the corners of a box: the ledger frame
// used in place of a full border. Absolutely positioned, so the parent must be
// `position: relative`; inert to pointer events.
export const LedgerCorners: FC<Props> = ({ color, size = 13 }) => {
  const mark = `1.5px solid ${color}`;

  const style = (c: (typeof CORNERS)[number]): CSSProperties => ({
    position: "absolute",
    width: size,
    height: size,
    top: "top" in c ? 0 : undefined,
    bottom: "bottom" in c ? 0 : undefined,
    left: "left" in c ? 0 : undefined,
    right: "right" in c ? 0 : undefined,
    borderTop: "top" in c ? mark : undefined,
    borderBottom: "bottom" in c ? mark : undefined,
    borderLeft: "left" in c ? mark : undefined,
    borderRight: "right" in c ? mark : undefined,
    transition: "border-color 0.35s var(--ease-smooth)",
    pointerEvents: "none",
  });

  return (
    <>
      {CORNERS.map((c, i) => (
        <span key={i} style={style(c)} aria-hidden />
      ))}
    </>
  );
};
