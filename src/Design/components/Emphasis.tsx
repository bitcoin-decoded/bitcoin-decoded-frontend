import { type FC, type ReactNode, type CSSProperties } from "react";
import { usePageTheme } from "../Theme";

type Props = {
  children: ReactNode;
};

/**
 * Subtle text emphasis using the world's accent color.
 * Replaces most <strong> usages for a more elegant, themed look.
 */
export const Emphasis: FC<Props> = ({ children }) => {
  const { colors, moduleTheme } = usePageTheme();

  const style: CSSProperties = {
    color: moduleTheme === "base"
      ? colors.base.text.primary
      : colors[moduleTheme].text.primary,
    fontWeight: 600,
    letterSpacing: "0.01em",
  };

  return <span style={style}>{children}</span>;
};
