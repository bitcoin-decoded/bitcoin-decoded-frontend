import { createElement, type CSSProperties, type FC, type ReactNode } from "react";

import { useBreakpoint } from "../Responsive";

import { Separator } from "./Separator";

type Size = "md" | "lg";

type Props = {
  children: ReactNode;
  /** Inner padding (md = simulator default, lg = roomier). @default "md" */
  size?: Size;
  /** Vertical gap between direct children. @default "1rem" */
  gap?: string | number;
  /** Vertical margin around the card. */
  margin?: string;
  /** HTML tag the card renders as. @default "div" */
  as?: "div" | "section" | "article" | "aside";
  /** Inline style escape hatch (merged last). */
  style?: CSSProperties;
  /** Custom class. */
  className?: string;
  /**
   * @deprecated No-op in the ledger design system. The transaction frame is
   * transparent and its state is signaled by the content, not the frame. Kept
   * temporarily so the existing callers still compile; will be removed in a
   * follow-up caller-cleanup PR.
   */
  glowColor?: string;
  /**
   * @deprecated No-op in the ledger design system. The transaction frame is
   * intentionally transparent so its content bleeds into the page margin.
   */
  fillColor?: string;
};

/**
 * The interactive surface of the ledger design system. Every interactive
 * component is bracketed top and bottom by the three-square Separator (the
 * ledger's "pause" marker, in the module color) rather than by horizontal
 * rules — a rule would read as a block top/bottom delimiter and blur the
 * boundary between the chapter's chain and the embedded tool. The sides stay
 * open so the content bleeds into the page margin like the block-shells around
 * it. This three-square bracket is the canonical "this is an interactive
 * component" pattern (see feedback-design-refonte-rules).
 *
 * Per the block-vs-coin dichotomy (rule 9), the square is structural; sliders
 * and other draggable controls use the gold circle (coin) instead.
 */
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

  return createElement(
    as,
    { className, style: containerStyle },
    <Separator key="top" margin="0" />,
    <div style={bodyStyle} key="body">
      {children}
    </div>,
    <Separator key="bottom" margin="0" />,
  );
};
