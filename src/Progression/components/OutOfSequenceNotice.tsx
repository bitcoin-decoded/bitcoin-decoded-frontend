import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useResumeOffer } from "../hooks";

import { DoodleLock } from "@doodle";

export const OutOfSequenceNotice: FC = () => {
  const { show, title, body, actionLabel, onAction } = useResumeOffer();

  if (!show) return null;

  return (
    <FeedbackPanel
      tone="info"
      title={title}
      icon={<DoodleLock size={22} aria-hidden />}
      style={{ marginBottom: "2rem" }}
    >
      <p style={{ margin: "0 0 1rem" }}>{body}</p>
      <Button variant="primary" onClick={onAction}>
        {actionLabel}
      </Button>
    </FeedbackPanel>
  );
};
