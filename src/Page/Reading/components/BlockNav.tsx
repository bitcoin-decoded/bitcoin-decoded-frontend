import { type CSSProperties, type FC } from "react";

import { ArrowDown, ArrowUp, Check, Lock } from "lucide-react";

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
 * The single navigation set, rendered only under the active block. A discreet
 * "previous" (ghost), a primary "next" / "finish", and a lock hint shown while
 * a tool block has not been manipulated.
 */
export const BlockNav: FC<Props> = ({ isFirst, isLast, locked, onPrev, onNext, onFinish }) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
    marginTop: "1.75rem",
  };

  return (
    <div style={containerStyle}>
      {!isFirst && (
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowUp size={15} strokeWidth={2} />}
          onClick={onPrev}
        >
          {t("reading.previous")}
        </Button>
      )}
      <div style={{ marginLeft: "auto" }}>
        <Button
          variant="primary"
          color={isLast ? colors.semantic.success.text : undefined}
          icon={
            isLast ? (
              <Check size={16} strokeWidth={2.5} />
            ) : (
              <ArrowDown size={16} strokeWidth={2} />
            )
          }
          iconPosition="right"
          disabled={locked}
          onClick={isLast ? onFinish : onNext}
        >
          {isLast ? t("reading.finish") : t("reading.next")}
        </Button>
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
