import type { ReactNode } from "react";

import { FeedbackPanel } from "../../../Design";
import type { ActionState } from "../types";

import { CircleCheck, CircleX } from "@icons";

export const renderFeedback = (
  state: ActionState,
  successMsg: ReactNode,
  failureMsg: ReactNode,
  success: string,
  danger: string,
) => {
  if (state === "idle") return null;
  const isSuccess = state === "success";
  return (
    <FeedbackPanel
      tone={isSuccess ? "error" : "success"}
      icon={
        isSuccess ? (
          <CircleCheck size={18} strokeWidth={2} color={danger} />
        ) : (
          <CircleX size={18} strokeWidth={2} color={success} />
        )
      }
    >
      {isSuccess ? successMsg : failureMsg}
    </FeedbackPanel>
  );
};
