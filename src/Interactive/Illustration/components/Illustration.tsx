import { type CSSProperties, type FC, type ReactNode } from "react";

import {
  BRAND,
  getBrandGold,
  getTypography,
  useBreakpoint,
  usePageTheme,
  withOpacity,
} from "../../../Design";
import { useIllustration } from "../hooks";

type IllustrationProps = {
  src?: string;
  children?: ReactNode;
  alt?: string;
  width?: string;
  caption?: string;
  /**
   * Override the vertical margin around the figure. The default
   * `2.5rem auto` suits standalone in-page illustrations; pass a smaller
   * value when embedding inside another card (e.g. inside an expandable
   * definition body).
   */
  margin?: string;
};

export const Illustration: FC<IllustrationProps> = ({
  src,
  children,
  alt,
  width = "100%",
  caption,
  margin = "2.5rem auto",
}) => {
  const typo = getTypography();
  const { theme, colors } = usePageTheme();
  const { isHovered, containerHandlers } = useIllustration();
  const isMobile = useBreakpoint() === "mobile";

  const gold = getBrandGold(theme);
  const cornerSize = isMobile ? 10 : 14;
  // Gap between the picture edge and the brackets.
  const bracketInset = 5;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin,
    width: "100%",
    // On narrow screens the per-page `width` (e.g. "35%") would be tiny, so we
    // widen — but cap at ~22rem so the figure stays a figure and never balloons
    // to a full-bleed image on tablets / large phones.
    maxWidth: isMobile ? "min(100%, 22rem)" : width,
  };

  // The gold corner brackets sit in this wrapper's padding — just outside the
  // picture rather than on top of it, where gold-on-artwork would be unreadable.
  const frameWrapStyle: CSSProperties = {
    position: "relative",
    padding: bracketInset,
    // On mobile the wrap hugs the (height-capped) image, so a portrait figure
    // doesn't leave empty bars either side of it.
    width: isMobile && src ? "fit-content" : "100%",
    maxWidth: "100%",
    cursor: "pointer",
  };

  // Ledger frame: sharp corners, a hairline that merely seats the picture — the
  // brackets carry the structure. No drop shadow, no gradient-border glow.
  const frameStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    borderRadius: 0,
    border: `1px solid ${withOpacity(gold, isHovered ? 0.4 : 0.22)}`,
    backgroundColor: colors.base.background.secondary,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "border-color 0.3s var(--ease-smooth)",
  };

  // Same four L-shaped corners as Callout / the Quiz cells / the navbar numerals.
  const corners = (): ReactNode => {
    const s = `${BRAND.figures.ruleThickness}px solid ${withOpacity(gold, isHovered ? 0.9 : 0.55)}`;
    const base: CSSProperties = {
      position: "absolute",
      width: cornerSize,
      height: cornerSize,
      transition: "border-color 0.3s var(--ease-smooth)",
      pointerEvents: "none",
    };
    return (
      <>
        <span style={{ ...base, top: 0, left: 0, borderTop: s, borderLeft: s }} />
        <span style={{ ...base, top: 0, right: 0, borderTop: s, borderRight: s }} />
        <span style={{ ...base, bottom: 0, left: 0, borderBottom: s, borderLeft: s }} />
        <span style={{ ...base, bottom: 0, right: 0, borderBottom: s, borderRight: s }} />
      </>
    );
  };

  const contentTransitionStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
    filter:
      theme === "dark"
        ? isHovered
          ? "brightness(1)"
          : "brightness(0.9)"
        : isHovered
          ? "brightness(0.95)"
          : "none",
  };

  // Width alone can't bound a figure: a tall image at 22rem wide still ate most
  // of a phone screen. Cap the height too and let the width follow the ratio.
  const imgStyle: CSSProperties = {
    ...contentTransitionStyle,
    ...(isMobile
      ? {
          width: "auto",
          maxWidth: "100%",
          maxHeight: "min(38vh, 15rem)",
          objectFit: "contain",
        }
      : {}),
  };

  const captionStyle: CSSProperties = {
    marginTop: "0.75rem",
    fontSize: typo.label.fontSize,
    lineHeight: 1.5,
    color: colors.base.text.secondary,
    fontStyle: "italic",
    textAlign: "center",
    // Caption follows the figure width on mobile (no narrower than the
    // image - visual mismatch). Slight inset on desktop to keep the eye
    // anchored on the image.
    maxWidth: isMobile ? "100%" : "85%",
    paddingLeft: isMobile ? "0.25rem" : 0,
    paddingRight: isMobile ? "0.25rem" : 0,
  };

  return (
    <figure style={containerStyle}>
      <div style={frameWrapStyle} {...containerHandlers}>
        {corners()}
        <div style={frameStyle}>
          {src ? (
            <img src={src} alt={alt || "Illustration"} style={imgStyle} />
          ) : (
            <div
              style={{
                ...contentTransitionStyle,
                display: "flex",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {caption && <figcaption style={captionStyle}>{caption}</figcaption>}
    </figure>
  );
};
