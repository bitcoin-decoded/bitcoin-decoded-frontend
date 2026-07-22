import { ROUTE_NAME, type RouteName } from "../../Routing";

import { MODULE_QUIZ_BADGE_ID } from "./MODULE_QUIZ_BADGE_ID";

export const QUIZ_BADGE_BY_ROUTE: Partial<Record<RouteName, string>> = {
  [ROUTE_NAME.Banking_7]: MODULE_QUIZ_BADGE_ID.banking,
  [ROUTE_NAME.MoneyLaws_6]: MODULE_QUIZ_BADGE_ID.moneyLaws,
  [ROUTE_NAME.Bitcoin_9]: MODULE_QUIZ_BADGE_ID.bitcoin,
};
