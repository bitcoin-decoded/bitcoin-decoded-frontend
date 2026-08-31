import { type CSSProperties, type FC, type ReactNode } from "react";

type Props = {
  id: string;
  align?: "left" | "center";
  children: ReactNode;
};

// One rung of the staircase. Content-sized with a generous vertical rhythm (no
// forced 100svh, no centering — that left a big empty band above each palier)
// and no scroll-snap, so the page reads as one calm continuous scroll. The
// side/vertical padding is fluid (clamp) so it holds on a short phone.
export const PalierSection: FC<Props> = ({ id, align = "left", children }) => {
  const sectionStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    boxSizing: "border-box",
    padding: "clamp(3.25rem, 8vh, 5.5rem) clamp(1.25rem, 6vw, 3rem)",
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
