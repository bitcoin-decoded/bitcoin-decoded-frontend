import { type CSSProperties, type FC, type ReactNode, useState } from "react";

import { ArrowUpRight } from "lucide-react";

import { type RouteName, useRouterContext } from "../../Routing";
import { withOpacity } from "../helpers";
import { usePageTheme } from "../Theme";

type CommonProps = {
  children: ReactNode;
};

type InternalProps = CommonProps & {
  /** Route id to navigate to (in-app navigation via the router context). */
  to: RouteName;
  href?: never;
};

type ExternalProps = CommonProps & {
  /** Absolute URL. Opens in a new tab with rel=noopener noreferrer. */
  href: string;
  to?: never;
};

type Props = InternalProps | ExternalProps;

/**
 * Inline cross-reference link. Polymorphic - choose the flavor by which
 * prop you pass:
 *
 * @example
 *   // Internal: jump to another chapter / module
 *   <Reference to={ROUTE_NAME.Banking_4}>le module qui casse le moteur</Reference>
 *
 *   // External: open a deep-dive in a new tab
 *   <Reference href="https://en.wikipedia.org/wiki/Byzantine_fault">
 *     les généraux byzantins
 *   </Reference>
 *
 * Visual: dotted underline + the page's world accent color (Banking blue,
 * MoneyLaws violet, Bitcoin amber). External links get a trailing ↗ icon.
 * Underline opacity intensifies on hover / focus.
 *
 * --- When to use which primitive --------------------------------------
 *   • <strong>        → un mot / concept à faire ressortir, sans lien
 *   • <HighlightText> → un passage entier (effet stabilo), sans lien
 *   • <Reference>     → cross-référence cliquable (interne OU externe)
 *
 * If the goal is purely visual emphasis, DON'T use Reference - its
 * dotted underline reads as "click me" and will frustrate the user.
 * Reach for <strong> or <HighlightText> instead.
 * ---------------------------------------------------------------------
 */
export const Reference: FC<Props> = ({ children, ...rest }) => {
  const { colors, moduleTheme } = usePageTheme();
  const { setCurrentPage } = useRouterContext();
  const [hovered, setHovered] = useState(false);

  // text.secondary on a world page, base.text.primary on neutral pages.
  // The dotted underline carries the "interactive" signal; the color is
  // only there to confirm it.
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
