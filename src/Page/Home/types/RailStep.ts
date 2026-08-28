import type { TranslationKey } from "../../../I18n";

// A rung of the left-hand descent rail: the section it anchors to and its label.
export type RailStep = {
  id: string;
  labelKey: TranslationKey;
};
