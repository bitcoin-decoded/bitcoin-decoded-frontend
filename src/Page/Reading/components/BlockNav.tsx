import { type CSSProperties, type FC } from "react";

import { Button, Caption, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

import { DoodleArrowDown, DoodleArrowUp } from "@doodle";
import { Lock } from "@icons";

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

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    gap: "0.85rem",
  };

  return (
    <div style={wrapperStyle}>
      {locked && (
        <Caption
          variant="note"
          size="sm"
          color={hintColor}
          icon={<Lock size={13} strokeWidth={2} />}
          style={{ alignSelf: "flex-end" }}
        >
          {t("reading.lockHint")}
        </Caption>
      )}
      <div style={rowStyle}>
        {!isFirst && (
          <Button
            variant="primary"
            color={moduleColor}
            icon={<DoodleArrowUp size={24} />}
            hideBrackets
            onClick={onPrev}
            style={{ opacity: 0.75 }}
          >
            {t("reading.previous")}
          </Button>
        )}
        <div style={{ marginLeft: isMobile ? undefined : "auto" }}>
          {isLast && outOfSequence ? (
            <Button variant="primary" color={moduleColor} onClick={onResume}>
              {resumeLabel}
            </Button>
          ) : isLast ? (
            <Button
              variant="stamped"
              color={moduleColor}
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
