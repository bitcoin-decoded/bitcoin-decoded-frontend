import type { TranslationKey } from "../../I18n";
import type { TxId } from "../hooks";

export type Branch = {
  id: TxId;
  labelKey: TranslationKey;
  recipientKey: TranslationKey;
  originKey: TranslationKey;
};
