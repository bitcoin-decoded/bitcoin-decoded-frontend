import { ROUTE_NAME } from "../../../Routing";
import type { PageMetadataMap } from "../types";

// Source of truth for reading-time estimates. Each entry is the FR
// prose word count plus the number of interactives on the page.
// Don't hand-type new values — re-run `npm run audit:reading-time`
// after any content change and copy the script's output back here.

export const PAGE_METADATA: PageMetadataMap = {
  // Banking — Le fonctionnement du système bancaire
  [ROUTE_NAME.Banking_1]: { wordCount: 581, interactiveCount: 1 },
  [ROUTE_NAME.Banking_2]: { wordCount: 558, interactiveCount: 1 },
  [ROUTE_NAME.Banking_3]: { wordCount: 925, interactiveCount: 1 },
  [ROUTE_NAME.Banking_4]: { wordCount: 755, interactiveCount: 1 },
  [ROUTE_NAME.Banking_5]: { wordCount: 415, interactiveCount: 2 },
  [ROUTE_NAME.Banking_6]: { wordCount: 550, interactiveCount: 2 },
  [ROUTE_NAME.Banking_7]: { wordCount: 960, interactiveCount: 4 },

  // MoneyLaws — Les lois de la monnaie
  [ROUTE_NAME.MoneyLaws_1]: { wordCount: 936, interactiveCount: 2 },
  [ROUTE_NAME.MoneyLaws_2]: { wordCount: 1912, interactiveCount: 7 },
  [ROUTE_NAME.MoneyLaws_3]: { wordCount: 1639, interactiveCount: 2 },
  [ROUTE_NAME.MoneyLaws_4]: { wordCount: 588, interactiveCount: 2 },
  [ROUTE_NAME.MoneyLaws_5]: { wordCount: 744, interactiveCount: 1 },

  // Bitcoin — La révolution Bitcoin
  [ROUTE_NAME.Bitcoin_1]: { wordCount: 1163, interactiveCount: 2 },
  [ROUTE_NAME.Bitcoin_2]: { wordCount: 1001, interactiveCount: 3 },
  [ROUTE_NAME.Bitcoin_3]: { wordCount: 741, interactiveCount: 3 },
  [ROUTE_NAME.Bitcoin_4]: { wordCount: 927, interactiveCount: 6 },
  [ROUTE_NAME.Bitcoin_5]: { wordCount: 1063, interactiveCount: 4 },
  [ROUTE_NAME.Bitcoin_6]: { wordCount: 634, interactiveCount: 4 },
  [ROUTE_NAME.Bitcoin_7]: { wordCount: 302, interactiveCount: 1 },
  [ROUTE_NAME.Bitcoin_8]: { wordCount: 439, interactiveCount: 2 },
  [ROUTE_NAME.Bitcoin_9]: { wordCount: 629, interactiveCount: 1 },
};
