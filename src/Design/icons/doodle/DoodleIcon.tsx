import { type SVGProps } from "react";

export type DoodleIconProps = Omit<SVGProps<SVGSVGElement>, "dangerouslySetInnerHTML"> & {
  /** Rendered square size in px. @default 24 */
  size?: number;
  /** Inner SVG markup of one vendored doodle glyph. */
  inner: string;
  viewBox?: string;
};

/**
 * Thin wrapper that paints a vendored doodle glyph in `currentColor`. The glyph
 * markup is injected as static, trusted SVG (Streamline Freehand, CC BY 4.0 —
 * attribution in the footer), which sidesteps JSX attribute renaming for the
 * hand-drawn path data.
 */
export const DoodleIcon = ({ size = 24, inner, viewBox = "0 0 24 24", ...props }: DoodleIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="currentColor"
    role="img"
    aria-hidden={props["aria-label"] ? undefined : true}
    dangerouslySetInnerHTML={{ __html: inner }}
    {...props}
  />
);
