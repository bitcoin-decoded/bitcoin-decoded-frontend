import {
  Children,
  type ComponentProps,
  type CSSProperties,
  type FC,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
} from "react";

import { Check, RotateCcw } from "lucide-react";

import { useBadges } from "../../../Achievements";
import { Button, usePageTheme, withOpacity } from "../../../Design";
import { FrText, useTranslation } from "../../../I18n";
import type { RouteName } from "../../../Routing";
import { PAGE_METADATA, PageNavigation } from "../../Shared";
import { useBlockReader } from "../hooks";

import { Block } from "./Block";
import { BlockChainLink } from "./BlockChainLink";
import { BlockMilestones } from "./BlockMilestones";
import { BlockNav } from "./BlockNav";
import { BlockShell } from "./BlockShell";

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
  const { colors } = usePageTheme();

  const blocks = Children.toArray(children).filter(
    (child): child is BlockElement => isValidElement(child) && child.type === Block,
  );
  const blockCount = blocks.length;

  // Opt-in drop-block lettrine: read from PAGE_METADATA so chapters that
  // open on a short or punchy sentence keep their breathing room. Only
  // applied to Block 0.
  const chapterMeta = PAGE_METADATA[chapterId as RouteName];
  const chapterDropBlock = chapterMeta?.dropBlock ?? false;

  const {
    containerRef,
    maxRevealed,
    current,
    finished,
    revealingIndex,
    isDone,
    markCompleteFns,
    advance,
    back,
    jump,
    finish,
    replay,
  } = useBlockReader({ chapterId, blockCount });

  // First-ever completion of this chapter unlocks its badge (idempotent - a
  // revisit or replay never re-awards). The badge's unlock overlay is the
  // completion celebration.
  const { award } = useBadges();
  useEffect(() => {
    if (finished) award(chapterId);
  }, [finished, award, chapterId]);

  // Theme-aware marginalia color (consumed by .reading-block-body in
  // index.css). Set inline so CSS pseudo-elements can read it.
  const containerStyle: CSSProperties = {
    ["--marginalia-color" as string]: withOpacity(colors.base.text.primary, 0.35),
  };

  return (
    <div ref={containerRef} className="reading-chapter-marginalia" style={containerStyle}>
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
            {i > 0 && <BlockChainLink revealing={isRevealing} />}
            <BlockShell
              index={i}
              isCurrent={isCurrent}
              revealing={isRevealing}
              title={block.props.title}
              dropBlock={i === 0 && chapterDropBlock}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.55rem 1.1rem",
                borderRadius: 999,
                background: withOpacity(colors.semantic.success.text, 0.12),
                border: `1px solid ${withOpacity(colors.semantic.success.text, 0.35)}`,
                color: colors.semantic.success.text,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                boxShadow: `0 6px 18px ${withOpacity(colors.semantic.success.text, 0.18)}`,
              }}
            >
              <Check size={14} strokeWidth={2.5} />
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
              size="sm"
              icon={<RotateCcw size={14} strokeWidth={2} />}
              onClick={replay}
            >
              {t("reading.replay")}
            </Button>
          </div>
          <PageNavigation />
        </>
      )}
    </div>
  );
};
