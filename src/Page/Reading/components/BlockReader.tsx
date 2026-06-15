import {
  Children,
  Fragment,
  isValidElement,
  type ComponentProps,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";

import { Check, RotateCcw } from "lucide-react";

import { Button, Caption, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { PageNavigation } from "../../Shared";
import { useBlockReader } from "../hooks";

import { Block } from "./Block";
import { BlockChainLink } from "./BlockChainLink";
import { BlockMilestones } from "./BlockMilestones";
import { BlockNav } from "./BlockNav";
import { BlockShell } from "./BlockShell";
import { ChapterCompleteOverlay } from "./ChapterCompleteOverlay";

type BlockElement = ReactElement<ComponentProps<typeof Block>>;

type Props = {
  /** Unique chapter id (ROUTE_NAME.*) — the localStorage namespace for progress. */
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
 * celebrates completion. All state lives in `useBlockReader`. Vertical flow —
 * never a carousel.
 */
export const BlockReader: FC<Props> = ({ chapterId, children }) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();

  const blocks = Children.toArray(children).filter(
    (child): child is BlockElement => isValidElement(child) && child.type === Block,
  );
  const blockCount = blocks.length;

  const {
    containerRef,
    maxRevealed,
    current,
    finished,
    celebrating,
    revealingIndex,
    isDone,
    markCompleteFns,
    advance,
    back,
    jump,
    finish,
    replay,
  } = useBlockReader({ chapterId, blockCount });

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
        const isRevealing = i === revealingIndex;
        const locked = kind === "tool" && !isDone(i);

        const raw = block.props.children;
        const content = typeof raw === "function" ? raw({ markComplete: markCompleteFns[i] }) : raw;

        return (
          <Fragment key={i}>
            {i > 0 && <BlockChainLink revealing={isRevealing} />}
            <BlockShell
              index={i}
              isCurrent={isCurrent}
              revealing={isRevealing}
              title={block.props.title}
              onActivate={() => jump(i)}
            >
              {content}

              {isCurrent && !finished && (
                <BlockNav
                  isFirst={i === 0}
                  isLast={isLast}
                  locked={locked}
                  onPrev={back}
                  onNext={advance}
                  onFinish={finish}
                />
              )}
            </BlockShell>
          </Fragment>
        );
      })}

      {finished && (
        <>
          <Caption
            as="p"
            color={colors.semantic.success.text}
            icon={<Check size={14} strokeWidth={2.5} />}
            style={{ marginTop: "2rem" }}
          >
            {t("reading.completed")}
          </Caption>
          <PageNavigation />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Button
              variant="ghost"
              size="sm"
              icon={<RotateCcw size={14} strokeWidth={2} />}
              onClick={replay}
            >
              {t("reading.replay")}
            </Button>
          </div>
        </>
      )}

      <ChapterCompleteOverlay show={celebrating} />
    </div>
  );
};
