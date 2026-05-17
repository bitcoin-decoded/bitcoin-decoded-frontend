import type { TranslationKey } from "../../../I18n";

import type { TxId } from "./TxId";

export type Branch = {
  id: TxId;
  labelKey: TranslationKey;
  recipientKey: TranslationKey;
  originKey: TranslationKey;
};
