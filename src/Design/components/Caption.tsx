import { createElement, type CSSProperties, type FC, type ReactNode } from "react";

import { BRAND, usePageTheme } from "../Theme";

type Tone = "world" | "muted" | "accent";
type Size = "xs" | "sm" | "md";
type Variant = "label" | "note";

type Props = {
  children: ReactNode;
  /**
   * Color recipe.
   * - `world` (default): module accent - uses the current page's world color (Banking blue, etc.)
   * - `muted`: base text.secondary - quiet/neutral context
   * - `accent`: module text.primary - slightly brighter, used as a soft emphasis
   * @default "world"
   */
  tone?: Tone;
  /**
   * Typographic register.
   * - `label` (default): tracked-out small-caps eyebrow — for short section
   *   labels / status words.
   * - `note`: normal case, tighter tracking — for readable short *instructions*
   *   ("manipule le composant…"). small-caps squashes a sentence into
   *   illegibility, so instruction text uses this register instead.
   * @default "label"
   */
  variant?: Variant;
  /** Visual scale. @default "sm" */
  size?: Size;
  /** Optional icon rendered before the text. */
  icon?: ReactNode;
  /** HTML tag the caption renders as. @default "span" */
  as?: "span" | "div" | "h2" | "h3" | "h4" | "p";
  /** Optional inline style escape hatch (merged last). */
  style?: CSSProperties;
  /**
   * Override the accent color directly (bypasses tone resolution). Useful
   * when you need an explicit semantic color (e.g. success green).
   */
  color?: string;
};

/**
 * Mono "eyebrow" / section-label / instruction-note primitive.
 *
 * The ledger register: `Cutive Mono` + weight 500 (Cutive Mono ships a single
 * weight, so anything heavier synthesizes a crude faux-bold). Two registers via
 * `variant`: `label` (default) is tracked-out small-caps — NOT
 * `text-transform: uppercase` (rule 8) — for short eyebrows/labels; `note` is
 * normal-case for readable short instructions. Collapses the 60+ hand-rolled
 * eyebrows across the Interactive domain into one theme-aware component.
 */
export const Caption: FC<Props> = ({
  children,
  tone = "world",
  variant = "label",
  size = "sm",
  icon,
  as = "span",
  style,
  color,
}) => {
  const { colors, moduleTheme } = usePageTheme();

  // Component scale: secondary labels at 12px (the floor — never smaller),
  // `md` headers at 14px. `xs` no longer means "tiny"; it's just the 12px floor.
  const fontSize = size === "md" ? BRAND.fontSize.body : BRAND.fontSize.note;

  const resolvedColor =
    color ??
    (tone === "world"
      ? colors[moduleTheme].text.secondary
      : tone === "accent"
        ? colors[moduleTheme].text.primary
        : colors.base.text.secondary);

  const isNote = variant === "note";
  const finalStyle: CSSProperties = {
    fontFamily: BRAND.fonts.mono,
    fontSize,
    fontWeight: 500,
    // Eyebrows are small-caps; instruction notes stay normal-case so the
    // sentence reads (small-caps + tiny size made them near-invisible).
    fontVariant: isNote ? "normal" : "small-caps",
    letterSpacing: isNote ? "0.02em" : "0.08em",
    color: resolvedColor,
    display: icon ? "inline-flex" : "inline",
    alignItems: icon ? "center" : undefined,
    gap: icon ? "0.45rem" : undefined,
    lineHeight: 1.2,
    margin: 0,
    ...style,
  };

  return createElement(as, { style: finalStyle }, icon, icon ? <span>{children}</span> : children);
};
