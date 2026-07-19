import type { RouteName } from "../../Routing";

/** Why a chapter is closed. Today there is one way: the way in is not open yet. */
export type LockReason = {
  /** The chapter that must be sealed before this one opens. */
  blockedBy: RouteName;
};
