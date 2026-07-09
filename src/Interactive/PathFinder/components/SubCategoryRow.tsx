import { type CSSProperties, type FC } from "react";

import { Badge, BRAND, getTypography, usePageTheme, withOpacity } from "../../../Design";
import type { PathFinderCopy } from "../data";
import type { SubCategoryItem } from "../types";

import { type IconType, Star } from "@icons";

type Props = {
  item: SubCategoryItem;
  icon: IconType;
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
  const typo = getTypography();
  const { colors } = usePageTheme();
  const neutral = colors.base.text.secondary;
  const isPlanA = item.plan === "A";

  const wrapStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    padding: "0.9rem 1rem",
    borderRadius: 0,
    border: `1px solid ${isPlanA ? withOpacity(accent, 0.5) : withOpacity(neutral, 0.14)}`,
    background: isPlanA ? withOpacity(accent, 0.06) : withOpacity(neutral, 0.02),
    transition: "all 0.3s var(--ease-smooth)",
  };

  const headerStyle: CSSProperties = { display: "flex", alignItems: "center", gap: "0.65rem" };

  // Structural icon badge — a square (radius 0), per the block-vs-coin rule.
  const iconChipStyle: CSSProperties = {
    width: "2rem",
    height: "2rem",
    borderRadius: 0,
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
    fontSize: typo.note.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.04em",
    color: accent,
  };

  const rightClusterStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    flexShrink: 0,
  };

  // The recommended star carries no glow (ledger surfaces stay flat).
  const starStyle: CSSProperties = {
    flexShrink: 0,
  };

  const commentStyle: CSSProperties = {
    margin: 0,
    fontSize: typo.note.fontSize,
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
