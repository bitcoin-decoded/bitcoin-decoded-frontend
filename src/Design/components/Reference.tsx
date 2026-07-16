import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { type RouteName, useRouterContext } from "../../Routing";
import { withOpacity } from "../helpers";
import { usePageTheme } from "../Theme";

import { ArrowUpRight } from "@icons";

type CommonProps = {
  children: ReactNode;
};

type InternalProps = CommonProps & {
  to: RouteName;
  href?: never;
};

type ExternalProps = CommonProps & {
  href: string;
  to?: never;
};

type Props = InternalProps | ExternalProps;

export const Reference: FC<Props> = ({ children, ...rest }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { setCurrentPage } = useRouterContext();
  const [hovered, setHovered] = useState(false);

  const accent =
    moduleTheme === "base" ? colors.base.text.primary : colors[moduleTheme].text.secondary;

  const baseStyle: CSSProperties = {
    color: accent,
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    font: "inherit",
    cursor: "pointer",
    textDecoration: "underline dotted",
    textDecorationColor: withOpacity(accent, hovered ? 0.85 : 0.4),
    textUnderlineOffset: "3px",
    transition: "text-decoration-color 0.2s var(--ease-smooth), color 0.2s var(--ease-smooth)",
  };

  const interactionHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if ("to" in rest && rest.to !== undefined) {
    return (
      <button
        type="button"
        onClick={() => setCurrentPage(rest.to)}
        style={baseStyle}
        {...interactionHandlers}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={rest.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...baseStyle,
        display: "inline",
      }}
      {...interactionHandlers}
    >
      {children}
      {/* Word joiner: the arrow is an atomic inline, so the browser was free to
       *  break the line right before it and strand it on its own row. U+2060
       *  forbids a break at that position without adding any width. */}
      {"\u2060"}
      <ArrowUpRight
        strokeWidth={2}
        style={{
          width: "0.85em",
          height: "0.85em",
          marginLeft: "0.15em",
          verticalAlign: "-0.1em",
        }}
        aria-hidden="true"
      />
      <span
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        (opens in a new tab)
      </span>
    </a>
  );
};
