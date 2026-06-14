import { ROUTE_NAME } from "../../../Routing";
import type { PageMetadataMap } from "../types";

// Source of truth for reading-time estimates. Each entry is the FR
// prose word count plus the number of interactives on the page.
// Don't hand-type new values — re-run `npm run audit:reading-time`
// after any content change and copy the script's output back here.

export const PAGE_METADATA: PageMetadataMap = {
  // Banking — Le fonctionnement du système bancaire
  [ROUTE_NAME.Banking_1]: { wordCount: 683, interactiveCount: 2 },
  [ROUTE_NAME.Banking_2]: { wordCount: 725, interactiveCount: 2 },
  [ROUTE_NAME.Banking_3]: { wordCount: 1044, interactiveCount: 2 },
  [ROUTE_NAME.Banking_4]: { wordCount: 787, interactiveCount: 2 },
  [ROUTE_NAME.Banking_5]: { wordCount: 422, interactiveCount: 2 },
  [ROUTE_NAME.Banking_6]: { wordCount: 595, interactiveCount: 2 },
  [ROUTE_NAME.Banking_7]: { wordCount: 644, interactiveCount: 5 },

  // MoneyLaws — Les lois de la monnaie
  [ROUTE_NAME.MoneyLaws_1]: { wordCount: 795, interactiveCount: 4 },
  [ROUTE_NAME.MoneyLaws_2]: { wordCount: 954, interactiveCount: 4 },
  [ROUTE_NAME.MoneyLaws_3]: { wordCount: 850, interactiveCount: 1 },
  [ROUTE_NAME.MoneyLaws_4]: { wordCount: 1093, interactiveCount: 2 },
  [ROUTE_NAME.MoneyLaws_5]: { wordCount: 757, interactiveCount: 3 },
  [ROUTE_NAME.MoneyLaws_6]: { wordCount: 473, interactiveCount: 2 },

  // Bitcoin — La révolution Bitcoin
  [ROUTE_NAME.Bitcoin_1]: { wordCount: 1396, interactiveCount: 2 },
  [ROUTE_NAME.Bitcoin_2]: { wordCount: 1102, interactiveCount: 3 },
  [ROUTE_NAME.Bitcoin_3]: { wordCount: 873, interactiveCount: 3 },
  [ROUTE_NAME.Bitcoin_4]: { wordCount: 1069, interactiveCount: 6 },
  [ROUTE_NAME.Bitcoin_5]: { wordCount: 976, interactiveCount: 5 },
  [ROUTE_NAME.Bitcoin_6]: { wordCount: 653, interactiveCount: 5 },
  [ROUTE_NAME.Bitcoin_7]: { wordCount: 373, interactiveCount: 3 },
  [ROUTE_NAME.Bitcoin_8]: { wordCount: 493, interactiveCount: 3 },
  [ROUTE_NAME.Bitcoin_9]: { wordCount: 561, interactiveCount: 2 },
};
