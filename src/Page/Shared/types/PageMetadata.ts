import type { RouteName } from "../../../Routing";

export type PageMetadata = {
  wordCount: number;
  interactiveCount: number;
  /**
   * When `true`, the first prose paragraph in Block 0 (the one immediately
   * after `ChapterPrelude`) opens with a drop-block lettrine — its first
   * letter rendered inside a small gold carré in Cormorant Garamond. Opt-in
   * per chapter so that openers with short or punchy first sentences (which
   * don't carry a lettrine well) keep their breathing room.
   *
   * Convention: enable on the first chapter of each module to mark the
   * module's entry point. Other chapters use it only when the opening
   * paragraph genuinely benefits.
   */
  dropBlock?: boolean;
};

export type PageMetadataMap = Partial<Record<RouteName, PageMetadata>>;
