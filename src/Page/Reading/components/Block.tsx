import { type FC, type ReactNode } from "react";

import type { BlockApi, BlockKind } from "../types";

type Props = {
  /** `"tool"` blocks gate the "next" control until the component completes. @default "prose" */
  kind?: BlockKind;
  /** Short label shown in the block header next to its index (e.g. "Le piège"). */
  title?: string;
  /** Marks the chapter's closing block (its control reads "Terminer"). */
  last?: boolean;
  /**
   * Block content. For a `tool` block, pass a render function: it receives
   * `{ markComplete }` to wire to the component's completion signal (e.g. the
   * loan granted, all definitions explored) — opening a disclosure is not a
   * completion. Prose blocks just pass children.
   */
  children: ReactNode | ((api: BlockApi) => ReactNode);
};

/**
 * Declarative marker for one reading block. It renders nothing on its own;
 * `BlockReader` reads `kind` / `last` off the element and owns reveal, dim,
 * gating and navigation. Authoring a chapter is wrapping the existing page JSX
 * in ordered `<Block>` boundaries — no prose is moved out, nothing is removed.
 */
export const Block: FC<Props> = ({ children }) => (
  <>{typeof children === "function" ? null : children}</>
);
