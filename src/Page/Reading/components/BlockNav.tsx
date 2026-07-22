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
    // Capped and centred on a phone. Left to their own widths the stacked
    // controls came out ragged, one wider than the other; edge to edge they
    // read as banners. A shared cap gives them one width and keeps a margin.
    maxWidth: isMobile ? "20rem" : undefined,
    marginLeft: isMobile ? "auto" : undefined,
    marginRight: isMobile ? "auto" : undefined,
    width: isMobile ? "100%" : undefined,
  };

  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "stretch" : "center",
    gap: "0.85rem",
  };

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
        {!isFirst && (
          <Button
            variant="primary"
            color={moduleColor}
            icon={<DoodleArrowUp size={24} />}
            hideBrackets
            fullWidth={isMobile}
            onClick={onPrev}
            style={{ opacity: 0.75 }}
          >
            {t("reading.previous")}
          </Button>
        )}
        <div style={{ marginLeft: isMobile ? undefined : "auto", width: isMobile ? "100%" : undefined }}>
          {isLast && outOfSequence ? (
            <Button variant="primary" color={moduleColor} fullWidth={isMobile} onClick={onResume}>
              {resumeLabel}
            </Button>
          ) : isLast ? (
            <Button
              variant="stamped"
              color={moduleColor}
              fullWidth={isMobile}
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
              fullWidth={isMobile}
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
