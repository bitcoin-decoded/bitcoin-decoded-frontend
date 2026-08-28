import { type CSSProperties, type FC, type ReactNode } from "react";

type Props = {
  id: string;
  align?: "left" | "center";
  children: ReactNode;
};

// One rung of the staircase: a full-viewport section that snaps into place. The
// height and side padding are fluid (clamp) so every palier holds on a short
// phone without a per-breakpoint branch; the top padding clears the sticky header.
export const PalierSection: FC<Props> = ({ id, align = "left", children }) => {
  const sectionStyle: CSSProperties = {
    position: "relative",
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "clamp(4.5rem, 11vh, 6.5rem) clamp(1.25rem, 6vw, 3rem) clamp(3rem, 8vh, 5rem)",
    scrollSnapAlign: "start",
  };

  const wrapStyle: CSSProperties = {
    width: "100%",
    maxWidth: "64rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: align === "center" ? "center" : "flex-start",
    textAlign: align === "center" ? "center" : "left",
  };

  return (
    <section id={id} style={sectionStyle}>
      <div style={wrapStyle}>{children}</div>
    </section>
  );
};
