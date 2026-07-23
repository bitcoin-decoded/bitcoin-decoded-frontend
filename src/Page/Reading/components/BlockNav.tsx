import { type CSSProperties, type FC } from "react";

import { Button, Caption, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

import { DoodleArrowDown, DoodleArrowUp, DoodleLock } from "@doodle";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  locked: boolean;
  outOfSequence: boolean;
  resumeLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  onResume: () => void;
};

export const BlockNav: FC<Props> = ({
  isFirst,
  isLast,
  locked,
  outOfSequence,
  resumeLabel,
  onPrev,
  onNext,
  onFinish,
  onResume,
}) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const isMobile = useBreakpoint() === "mobile";

  const moduleColor = moduleTheme === "base" ? undefined : colors[moduleTheme].text.secondary;
  const hintColor = moduleColor ?? withOpacity(colors.base.text.primary, 0.72);

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    marginTop: "1.75rem",
  };

  // One left, one right, at every width. Stacked they were a column of
  // lookalike blocks; side by side the pair says back and forward on its own.
  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    gap: isMobile ? "0.5rem" : "0.85rem",
  };

  // Equal halves, so the two controls are the same size whatever their labels.
  const cellStyle: CSSProperties = { flex: "1 1 0", display: "flex", minWidth: 0 };

  return (
    <div style={wrapperStyle}>
      {locked && (
        <Caption
          variant="note"
          size="sm"
          color={hintColor}
          icon={<DoodleLock size={17} />}
          style={{ alignSelf: "flex-end" }}
        >
          {t("reading.lockHint")}
        </Caption>
      )}
      <div style={rowStyle}>
        <div style={cellStyle}>
          {!isFirst && (
            <Button
              variant="primary"
              color={moduleColor}
              icon={<DoodleArrowUp size={24} />}
              hideBrackets
              fullWidth
              onClick={onPrev}
              style={{ opacity: 0.75 }}
            >
              {t("reading.previous")}
            </Button>
          )}
        </div>
        <div style={cellStyle}>
          {isLast && outOfSequence ? (
            <Button variant="primary" color={moduleColor} fullWidth onClick={onResume}>
              {resumeLabel}
            </Button>
          ) : isLast ? (
            <Button
              variant="stamped"
              color={moduleColor}
              fullWidth
              disabled={locked}
              onClick={onFinish}
            >
              {t("reading.finish")}
            </Button>
          ) : (
            <Button
              variant="primary"
              color={moduleColor}
              icon={<DoodleArrowDown size={24} />}
              iconPosition="right"
              hideBrackets
              fullWidth
              disabled={locked}
              onClick={onNext}
            >
              {t("reading.next")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
