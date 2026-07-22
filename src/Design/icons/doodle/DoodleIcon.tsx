import { type SVGProps } from "react";

export type DoodleIconProps = Omit<SVGProps<SVGSVGElement>, "dangerouslySetInnerHTML"> & {
  size?: number;
  inner: string;
  viewBox?: string;
};

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
