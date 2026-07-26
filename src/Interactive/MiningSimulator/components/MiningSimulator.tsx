import { type CSSProperties, type FC, useEffect, useRef } from "react";

import {
  Button,
  Caption,
  FeedbackPanel,
  getBrandGold,
  getTypography,
  SurfaceCard,
  useBreakpoint,
  usePageTheme,
  useThemeContext,
  withOpacity,
} from "../../../Design";
import { useTranslation } from "../../../I18n";
import { BlockPlate, BlockPlateRow } from "../../components";
import { truncateHash } from "../../helpers";
import { useMiningSimulator } from "../hooks";

import {
  DoodleClock,
  DoodleHash,
  DoodleHierarchy,
  DoodleMining,
  DoodleNumber,
  DoodleSmileyGrumpy,
  DoodleSmileyHappy,
} from "@doodle";

type Props = {
  onComplete?: () => void;
};

export const MiningSimulator: FC<Props> = ({ onComplete }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const typo = getTypography(breakpoint);
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const world = colors[moduleTheme];
  const gold = getBrandGold(theme);
  const { attempts, found, difficultyPrefix, headerFields, currentNonce, tryNonce, reset } =
    useMiningSimulator(onComplete);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [attempts.length]);

  const iconSize = isMobile ? 20 : 22;

  const targetRow: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: "0.5rem",
  };

  const targetLabel: CSSProperties = { ...typo.note, color: colors.base.text.secondary };
  const targetPrefix: CSSProperties = { ...typo.figure, color: gold, letterSpacing: "0.12em" };

  const headerValue: CSSProperties = { ...typo.figure, color: colors.base.text.secondary, wordBreak: "break-word" };
  const nonceValue: CSSProperties = { ...typo.figure, color: world.text.secondary };

  const logBox: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    maxHeight: "14rem",
    overflowY: "auto",
    padding: "0.5rem",
    background: withOpacity(colors.base.text.primary, theme === "dark" ? 0.05 : 0.035),
    border: `1px solid ${colors.base.border.tertiary}`,
  };

  const logHeadRow: CSSProperties = {
    ...typo.micro,
    fontVariant: "small-caps",
    color: colors.base.text.secondary,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.2rem 0.5rem",
    borderBottom: `1px solid ${withOpacity(world.border.secondary, 0.2)}`,
    marginBottom: "0.15rem",
  };

  const logRow = (valid: boolean): CSSProperties => ({
    ...typo.micro,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.3rem 0.5rem",
    background: valid ? withOpacity(colors.semantic.success.text, 0.1) : "transparent",
    color: valid ? colors.semantic.success.text : colors.base.text.secondary,
  });

  const nonceCol = isMobile ? "4.5rem" : "5.5rem";

  return (
    <SurfaceCard margin={isMobile ? "1.5rem 0" : "2rem 0"}>
      <Caption tone="world" size="md" icon={<DoodleMining size={iconSize} />}>
        {t("mining.title")}
      </Caption>

      <div style={targetRow}>
        <span style={targetLabel}>{t("mining.target")}</span>
        <span style={targetPrefix}>{difficultyPrefix}…</span>
      </div>

      <BlockPlate title={`${t("chain.block")} #${headerFields.height}`}>
        <BlockPlateRow icon={<DoodleHash size={iconSize} />} label={t("chain.prevHash")} zebra>
          <span style={headerValue}>{headerFields.prevHash}</span>
        </BlockPlateRow>
        <BlockPlateRow icon={<DoodleHierarchy size={iconSize} />} label={t("chain.merkleRoot")} zebra={false}>
          <span style={headerValue}>{headerFields.merkleRoot}</span>
        </BlockPlateRow>
        <BlockPlateRow icon={<DoodleClock size={iconSize} />} label={t("chain.timestamp")} zebra>
          <span style={headerValue}>{headerFields.timestamp}</span>
        </BlockPlateRow>
        <BlockPlateRow icon={<DoodleNumber size={iconSize} />} label={t("mining.nonce")} zebra={false}>
          <span style={nonceValue}>{currentNonce}</span>
        </BlockPlateRow>
      </BlockPlate>

      {attempts.length > 0 && (
        <div ref={scrollRef} style={logBox}>
          <div style={logHeadRow}>
            <span style={{ minWidth: nonceCol }}>{t("mining.nonce")}</span>
            <span style={{ flex: 1 }}>hash</span>
            <span style={{ width: "1rem" }} />
          </div>
          {attempts.map((a) => (
            <div key={a.nonce} className="chain-field-reveal" style={logRow(a.valid)}>
              <span style={{ minWidth: nonceCol }}>{a.nonce}</span>
              <span style={{ flex: 1, wordBreak: "break-all" }}>{truncateHash(a.hash)}</span>
              {a.valid && <DoodleSmileyHappy size={16} style={{ flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Button variant="primary" onClick={!found ? tryNonce : undefined} disabled={found}>
          {t("mining.button")}
        </Button>
        {attempts.length > 0 && (
          <Button variant="secondary" onClick={reset}>
            {t("mining.reset")}
          </Button>
        )}
      </div>

      {attempts.length > 0 && (
        <FeedbackPanel
          tone={found ? "success" : "info"}
          icon={found ? <DoodleSmileyHappy size={iconSize} /> : <DoodleSmileyGrumpy size={iconSize} />}
        >
          {found ? t("mining.found") : t("mining.notFound")}
        </FeedbackPanel>
      )}
    </SurfaceCard>
  );
};
