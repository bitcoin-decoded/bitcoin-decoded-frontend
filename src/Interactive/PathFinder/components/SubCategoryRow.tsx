import { type CSSProperties, type FC } from "react";

import { type LucideIcon, Star } from "lucide-react";

import { Badge, BRAND, usePageTheme, withOpacity } from "../../../Design";
import type { PathFinderCopy } from "../data";
import type { SubCategoryItem } from "../types";

type Props = {
  item: SubCategoryItem;
  icon: LucideIcon;
  copy: PathFinderCopy;
  accent: string;
};

/**
 * One sub-category inside a section: icon + label, a "Plan A/B" rank badge on
 * the right (Plan A also carries the big filled star) and the adaptive
 * descriptive comment underneath. No named products - the comment stays at
 * the category level by design.
 */
export const SubCategoryRow: FC<Props> = ({ item, icon: Icon, copy, accent }) => {
  const { colors } = usePageTheme();
  const neutral = colors.base.text.secondary;
  const isPlanA = item.plan === "A";

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: "0.9rem 1rem",
    borderRadius: "0.85rem",
    border: `1px solid ${isPlanA ? withOpacity(accent, 0.5) : withOpacity(neutral, 0.14)}`,
    background: isPlanA ? withOpacity(accent, 0.06) : withOpacity(neutral, 0.02),
    transition: "all 0.3s var(--ease-smooth)",
  };

  const headerStyle: CSSProperties = { display: "flex", alignItems: "center", gap: "0.65rem" };

  const iconChipStyle: CSSProperties = {
    width: "2rem",
    height: "2rem",
    borderRadius: "0.5rem",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: accent,
    background: withOpacity(accent, 0.12),
    border: `1px solid ${withOpacity(accent, 0.3)}`,
  };

  const labelStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    fontFamily: BRAND.fonts.mono,
    fontSize: "0.82rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: accent,
  };

  const rightClusterStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    flexShrink: 0,
  };

  const starStyle: CSSProperties = {
    flexShrink: 0,
    filter: `drop-shadow(0 0 6px ${withOpacity(accent, 0.55)})`,
  };

  const commentStyle: CSSProperties = {
    margin: 0,
    fontSize: "0.86rem",
    lineHeight: 1.5,
    color: colors.base.text.primary,
  };

  return (
    <div style={wrapStyle}>
      <div style={headerStyle}>
        <span style={iconChipStyle}>
          <Icon size={16} strokeWidth={2} />
        </span>
        <span style={labelStyle}>{item.label}</span>
        <span style={rightClusterStyle}>
          <Badge
            tone={isPlanA ? "world" : "neutral"}
            color={isPlanA ? accent : undefined}
            size="xs"
          >
            {copy.planPrefix} {item.plan}
          </Badge>
          {isPlanA && (
            <Star
              size={22}
              strokeWidth={1.5}
              fill={accent}
              color={accent}
              style={starStyle}
              aria-label={copy.recommendedAria}
            />
          )}
        </span>
      </div>

      <p style={commentStyle}>{item.comment}</p>
    </div>
  );
};
