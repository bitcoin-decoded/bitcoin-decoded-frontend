import type { TranslationKey } from "../../../I18n";
import type { ResumeTier } from "../types";

type TierCopy = {
  titleKey: TranslationKey;
  messageKey: TranslationKey;
  primaryLabelKey: TranslationKey;
  primaryKind: "resume" | "restart";
  secondaryKind: "restart" | "badges" | null;
};

// The title/message/buttons the resume block shows per progress tier. The message
// carries the {x} counter; the title is reused across the middle tiers.
export const RESUME_TIER_COPY: Record<ResumeTier, TierCopy> = {
  start: {
    titleKey: "home.resume.tier.start.title",
    messageKey: "home.resume.tier.start.message",
    primaryLabelKey: "home.resume.tier.start.button",
    primaryKind: "resume",
    secondaryKind: null,
  },
  early: {
    titleKey: "home.resume.title",
    messageKey: "home.resume.tier.early.message",
    primaryLabelKey: "home.resume.button",
    primaryKind: "resume",
    secondaryKind: "restart",
  },
  mid: {
    titleKey: "home.resume.title",
    messageKey: "home.resume.tier.mid.message",
    primaryLabelKey: "home.resume.button",
    primaryKind: "resume",
    secondaryKind: "restart",
  },
  half: {
    titleKey: "home.resume.title",
    messageKey: "home.resume.tier.half.message",
    primaryLabelKey: "home.resume.button",
    primaryKind: "resume",
    secondaryKind: "restart",
  },
  near: {
    titleKey: "home.resume.tier.near.title",
    messageKey: "home.resume.tier.near.message",
    primaryLabelKey: "home.resume.button",
    primaryKind: "resume",
    secondaryKind: "restart",
  },
  done: {
    titleKey: "home.resume.tier.done.title",
    messageKey: "home.resume.tier.done.message",
    primaryLabelKey: "home.resume.restart",
    primaryKind: "restart",
    secondaryKind: "badges",
  },
};
