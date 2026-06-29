import type { CSSProperties } from "react";

import type { Breakpoint } from "../../../Design/Responsive";

export const getPageStyles = (breakpoint: Breakpoint = "desktop") => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "48rem",
    margin: "0 auto",
    padding: "0 0.75rem",
  } as CSSProperties,

  illustrationsWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: breakpoint === "mobile" ? "1rem" : "2rem",
    width: "100%",
  } as CSSProperties,

  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: breakpoint === "mobile" ? "1.5rem" : "3rem",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "2rem",
    marginBottom: "4rem",
  } as CSSProperties,
});

/** @deprecated Use getPageStyles(breakpoint) instead */
export const PAGE_STYLES = getPageStyles("desktop");
