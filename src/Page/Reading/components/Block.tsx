import { type FC, type ReactNode } from "react";

import type { BlockApi, BlockKind } from "../types";

type Props = {
  kind?: BlockKind;
  title?: string;
  last?: boolean;
  children: ReactNode | ((api: BlockApi) => ReactNode);
};

export const Block: FC<Props> = ({ children }) => (
  <>{typeof children === "function" ? null : children}</>
);
