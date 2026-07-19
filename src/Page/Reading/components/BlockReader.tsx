import {
  Children,
  type ComponentProps,
  type FC,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
} from "react";

import { useBadges } from "../../../Achievements";
import { BRAND, Button, getBrandGold, usePageTheme, useThemeContext } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import { useResumeOffer } from "../../../Progression";
import { useBlockReader } from "../hooks";

import { Block } from "./Block";
import { BlockMilestones } from "./BlockMilestones";
import { BlockNav } from "./BlockNav";
import { BlockShell } from "./BlockShell";

import { RotateCcw } from "@icons";

type BlockElement = ReactElement<ComponentProps<typeof Block>>;

type Props = {
  /** Unique chapter id (ROUTE_NAME.*) - the localStorage namespace for progress. */
  chapterId: string;
  /** Ordered `<Block>` children. */
  children: ReactNode;
};

/**
 * Turns a chapter's JSX into a block-by-block read: revealed blocks render as
 * enclosed cards linked by a chain, the active one is highlighted and
 * interactive while past ones recede and lock, tool blocks gate the "next"
 * control until their component completes (via the render-prop `markComplete`),
 * jalons track position and jump to any revealed block, and a centered overlay
 * celebrates completion. All state lives in `useBlockReader`. Vertical flow -
 * never a carousel.
 */
export const BlockReader: FC<Props> = ({ chapterId, children }) => {
  const { t } = useTranslation();
  const { colors, moduleTheme } = usePageTheme();
  const { theme } = useThemeContext();
  const gold = getBrandGold(theme);
  // Module identity color for the seal celebration (matches the seal button),
  // falling back to gold on neutral pages.
  const moduleAccent = moduleTheme === "base" ? gold : colors[moduleTheme].text.secondary;

  const blocks = Children.toArray(children).filter(
    (child): child is BlockElement => isValidElement(child) && child.type === Block,
  );
  const blockCount = blocks.length;

  // The badge is read *before* the reader hook, because it is what decides
  // where an arriving reader lands (see `getChapterState`).
  const { award, isEarned } = useBadges();
  const badgeEarned = isEarned(chapterId);
  // Reading is free, progressing is not. A chapter reached out of order can be
  // read end to end without ever counting, which is what keeps the sequence
  // meaningful now that no URL is refused.
  const { show: outOfSequence, actionLabel: resumeLabel, onAction: onResume } = useResumeOffer();

  const {
    containerRef,
    maxRevealed,
    current,
    finished,
    getRevealPhase,
    isDone,
    markCompleteFns,
    advance,
    back,
    jump,
    finish,
    replay,
  } = useBlockReader({ chapterId, blockCount, badgeEarned });

  // First-ever completion of this chapter unlocks its badge (idempotent - a
  // revisit or replay never re-awards). The badge's unlock overlay is the
  // completion celebration. Skipped out of order: the badge is what moves the
  // frontier, so awarding it here would let a single deep link unlock a whole
  // module.
  useEffect(() => {
    if (finished && !outOfSequence) award(chapterId);
  }, [finished, outOfSequence, award, chapterId]);

  return (
    <div ref={containerRef}>
      {blockCount > 1 && (
        <BlockMilestones
          count={blockCount}
          current={current}
          maxRevealed={maxRevealed}
          onJump={jump}
        />
      )}

      {blocks.map((block, i) => {
        if (i > maxRevealed) return null;

        const kind = block.props.kind ?? "prose";
        const isLast = block.props.last ?? i === blockCount - 1;
        const isCurrent = i === current;
        const locked = kind === "tool" && !isDone(i);

        // Render-prop blocks (tool blocks) are evaluated AFTER PageTemplate's
        // top-level `<FrText>` has walked the static tree. Their output never
        // sees the French-typography pass unless we re-wrap it here. Static
        // children already went through the outer walk - no double-pass needed.
        const raw = block.props.children;
        const content =
          typeof raw === "function" ? (
            <FrText>{raw({ markComplete: markCompleteFns[i] })}</FrText>
          ) : (
            raw
          );

        return (
          <Fragment key={i}>
            <BlockShell
              index={i}
              isCurrent={isCurrent}
              revealPhase={getRevealPhase(i)}
              title={block.props.title}
              onActivate={() => jump(i)}
            >
              {content}

              {isCurrent && !finished && (
                <BlockNav
                  isFirst={i === 0}
                  isLast={isLast}
                  locked={locked}
                  outOfSequence={outOfSequence}
                  resumeLabel={resumeLabel}
                  onPrev={back}
                  onNext={advance}
                  onFinish={finish}
                  onResume={onResume}
                />
              )}
            </BlockShell>
          </Fragment>
        );
      })}

      {finished && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.7rem",
              marginTop: "2.5rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontFamily: BRAND.fonts.mono,
                fontSize: "1.6rem",
                color: moduleAccent,
                lineHeight: 1,
              }}
            >
              ⌗
            </span>
            <span
              style={{
                fontFamily: BRAND.fonts.display,
                fontSize: "1.85rem",
                fontWeight: 700,
                color: moduleAccent,
                lineHeight: 1.1,
              }}
            >
              {t("reading.completed")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.5rem",
            }}
          >
            <Button
              variant="ghost"
              size="md"
              icon={<RotateCcw size={16} strokeWidth={2} />}
              onClick={replay}
            >
              {t("reading.replay")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
