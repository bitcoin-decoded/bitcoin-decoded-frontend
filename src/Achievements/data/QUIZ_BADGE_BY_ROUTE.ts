import { ROUTE_NAME, type RouteName } from "../../Routing";

import { MODULE_QUIZ_BADGE_ID } from "./MODULE_QUIZ_BADGE_ID";

/**
 * The badge a module quiz awards, which is not named after its route.
 *
 * Every chapter badge is its own `ROUTE_NAME`, so asking "is this route done?"
 * works by passing the route straight through. A quiz breaks that: it awards
 * the module's trophy, `module-banking-quiz`, while its route is `banking-7`.
 * Without this the navbar asks about `banking-7`, is told no, and a passed quiz
 * looks unfinished forever.
 */
export const QUIZ_BADGE_BY_ROUTE: Partial<Record<RouteName, string>> = {
  [ROUTE_NAME.Banking_7]: MODULE_QUIZ_BADGE_ID.banking,
  [ROUTE_NAME.MoneyLaws_6]: MODULE_QUIZ_BADGE_ID.moneyLaws,
  [ROUTE_NAME.Bitcoin_9]: MODULE_QUIZ_BADGE_ID.bitcoin,
};
