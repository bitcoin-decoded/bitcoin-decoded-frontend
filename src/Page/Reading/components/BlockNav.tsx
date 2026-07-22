import { type CSSProperties, type FC } from "react";

import { Button, Caption, useBreakpoint, usePageTheme, withOpacity } from "../../../Design";
import { useTranslation } from "../../../I18n";

import { DoodleArrowDown, DoodleArrowUp } from "@doodle";
import { Lock } from "@icons";

type Props = {
  isFirst: boolean;
  isLast: boolean;
  locked: boolean;
  /**
   * The chapter was reached out of order, so it cannot be sealed. The seal CTA
   * gives way to the offer to join the course, which is the moment the reader
   * is most likely to accept it: they have just read a whole chapter.
   */
  outOfSequence: boolean;
  resumeLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  onResume: () => void;
};

/**
 * The single navigation set, rendered only under the active block. Previous
 * and next share the same bracketed primary treatment (same size, same shape)
 * so the pair reads as a consistent control; the final block swaps "next" for
 * a `stamped` seal CTA — the literal gold cachet that seals the chapter. A
 * lock hint appears while a tool block hasn't been manipulated.
 */
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

  // Bring the module identity color back onto the navigation controls (violet
  // on MoneyLaws, blue on Banking, …). On neutral pages `undefined` lets the
  // Button fall back to its gold default.
  const moduleColor = moduleTheme === "base" ? undefined : colors[moduleTheme].text.secondary;
  // The lock hint takes the module color (it explains the locked module-colored
  // next button); neutral readable fallback on base pages.
  const hintColor = moduleColor ?? withOpacity(colors.base.text.primary, 0.72);

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    marginTop: "1.75rem",
  };

  // Stacked on a phone, but centred rather than stretched. Edge to edge, a
  // control ends up mostly empty and its label floats in the middle of a very
  // wide box, which reads as a banner rather than as something to press.
  const rowStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    gap: "0.85rem",
  };

  return (
    <div style={wrapperStyle}>
      {locked && (
        // Above the buttons, right-aligned, in the module color — it explains
        // why the next button is locked.
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
