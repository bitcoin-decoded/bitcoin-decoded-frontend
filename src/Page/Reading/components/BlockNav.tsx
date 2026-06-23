import { type CSSProperties, type FC } from "react";

import { ArrowDown, ArrowUp, Lock } from "lucide-react";

import { Button, Caption, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  locked: boolean;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

/**
 * The single navigation set, rendered only under the active block. Previous
 * and next share the same bracketed primary treatment (same size, same shape)
 * so the pair reads as a consistent control; the final block swaps "next" for
 * a `stamped` seal CTA — the literal gold cachet that seals the chapter. A
 * lock hint appears while a tool block hasn't been manipulated.
 */
export const BlockNav: FC<Props> = ({ isFirst, isLast, locked, onPrev, onNext, onFinish }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();

  // Bring the module identity color back onto the navigation controls (violet
  // on MoneyLaws, blue on Banking, …). On neutral pages `undefined` lets the
  // Button fall back to its gold default.
  const moduleColor = moduleTheme === "base" ? undefined : colors[moduleTheme].text.secondary;

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.85rem",
    marginTop: "1.75rem",
  };

  return (
    <div style={containerStyle}>
      {!isFirst && (
        <Button
          variant="primary"
          color={moduleColor}
          icon={<ArrowUp size={16} strokeWidth={2} />}
          onClick={onPrev}
          style={{ opacity: 0.75 }}
        >
          {t("reading.previous")}
        </Button>
      )}
      <div style={{ marginLeft: "auto" }}>
        {isLast ? (
          <Button variant="stamped" color={moduleColor} disabled={locked} onClick={onFinish}>
            {t("reading.finish")}
          </Button>
        ) : (
          <Button
            variant="primary"
            color={moduleColor}
            icon={<ArrowDown size={16} strokeWidth={2} />}
            iconPosition="right"
            disabled={locked}
            onClick={onNext}
          >
            {t("reading.next")}
          </Button>
        )}
      </div>
      {locked && (
        <Caption
          tone="muted"
          size="xs"
          icon={<Lock size={12} strokeWidth={2} />}
          style={{ flexBasis: "100%" }}
        >
          {t("reading.lockHint")}
        </Caption>
      )}
    </div>
  );
};
