import { type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useResumeOffer } from "../hooks";

import { DoodleLock } from "@doodle";

/**
 * Shown at the top of a chapter reached out of order. In the flow, never over
 * the content: an overlay on the page a search engine just sent someone to is
 * the textbook intrusive interstitial, and would cost the acquisition this
 * whole thing exists to win.
 */
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
