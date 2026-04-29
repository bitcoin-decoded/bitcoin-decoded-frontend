import type { RouteName } from "../../../Routing";

export type PageMetadata = {
  wordCount: number;
  interactiveCount: number;
};

export type PageMetadataMap = Partial<Record<RouteName, PageMetadata>>;
