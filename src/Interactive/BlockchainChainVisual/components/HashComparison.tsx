import { type CSSProperties, type FC } from "react";

import { BRAND, getTypography, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { truncateHash } from "../../helpers";

type Props = {
  originalHash: string;
  newHash: string;
  /** Zone color (e.g. violet for hashes, blue for merkle root). Original is dimmed via opacity, new stays full strength. */
  accent: string;
};

export const HashComparison: FC<Props> = ({ originalHash, newHash, accent }) => {
  const typo = getTypography();
  const { t } = useTranslation();
  const { colors } = usePageTheme();

  const mono = { fontFamily: BRAND.fonts.mono } as const;

  const wrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    marginTop: "0.1rem",
  };

  const row: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    flexWrap: "wrap",
  };

  const labelBase: CSSProperties = {
    ...mono,
    fontSize: typo.micro.fontSize,
    fontWeight: 500,
    fontVariant: "small-caps",
    letterSpacing: "0.06em",
    color: colors.base.text.secondary,
  };

  const valueBase: CSSProperties = {
    ...mono,
    fontSize: typo.micro.fontSize,
    wordBreak: "break-all",
  };

  // Emphasis is carried by color + opacity, not weight (Cutive Mono is
  // single-weight; the "before" is dimmed, the "after" stays full strength).
  return (
    <div style={wrapper}>
      <div style={row}>
        <span style={labelBase}>{t("chain.originalHash")}</span>
        <span style={{ ...valueBase, color: accent, opacity: 0.55, fontWeight: 500 }}>
          {truncateHash(originalHash)}
        </span>
      </div>
      <div style={row}>
        <span style={{ ...labelBase, color: accent }}>{t("chain.newHash")}</span>
        <span style={{ ...valueBase, color: accent, fontWeight: 500 }}>
          {truncateHash(newHash)}
        </span>
      </div>
    </div>
  );
};
