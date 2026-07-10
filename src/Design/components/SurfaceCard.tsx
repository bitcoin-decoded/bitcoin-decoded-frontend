import { createElement, type CSSProperties, type FC, type ReactNode } from "react";

import { useBreakpoint } from "../Responsive";

type Size = "md" | "lg";

type Props = {
  children: ReactNode;
  size?: Size;
  gap?: string | number;
  margin?: string;
  as?: "div" | "section" | "article" | "aside";
  style?: CSSProperties;
  className?: string;
  glowColor?: string;
  fillColor?: string;
};

export const SurfaceCard: FC<Props> = ({
  children,
  size = "md",
  gap = "1rem",
  margin,
  as = "div",
  style,
  className,
}) => {
  const isMobile = useBreakpoint() === "mobile";

  const padding = size === "lg" ? (isMobile ? "1.5rem" : "2rem") : isMobile ? "1.25rem" : "1.5rem";

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    margin,
    ...style,
  };

  const bodyStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap,
    padding,
  };

  return createElement(as, { className, style: containerStyle }, <div style={bodyStyle}>{children}</div>);
};
