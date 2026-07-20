import type { RouteName } from "../types/RouteName";

import { ROUTE_NAME } from "./ROUTE_NAME";

/**
 * The public URL of every route.
 *
 * Slugs lead with the term the page should be found on, so they say the same
 * thing as the `<title>` rather than a second, unrelated thing. They carry no
 * chapter number: a number adds no search term and freezes the order, so
 * reordering a module would break every address in it.
 *
 * Module segments are French because the audience is, and the segment is a
 * high-value position to spend on a word nobody searches. The English paths
 * arrive under `/en/` when the language moves into the URL.
 *
 * Nothing outside this file knows what a URL looks like: the application moves
 * `RouteName` around and the router translates at the edges.
 */
export const ROUTE_PATH: Record<RouteName, string> = {
  [ROUTE_NAME.HomePage]: "/",

  [ROUTE_NAME.Banking_1]: "/systeme-bancaire/creation-monetaire",
  [ROUTE_NAME.Banking_2]: "/systeme-bancaire/monnaie-centrale-et-monnaie-bancaire",
  [ROUTE_NAME.Banking_3]: "/systeme-bancaire/assouplissement-quantitatif",
  [ROUTE_NAME.Banking_4]: "/systeme-bancaire/allocation-du-credit",
  [ROUTE_NAME.Banking_5]: "/systeme-bancaire/effet-cantillon",
  [ROUTE_NAME.Banking_6]: "/systeme-bancaire/inflation",
  [ROUTE_NAME.Banking_7]: "/systeme-bancaire/quiz",

  [ROUTE_NAME.MoneyLaws_1]: "/lois-de-la-monnaie/qu-est-ce-que-la-monnaie",
  [ROUTE_NAME.MoneyLaws_2]: "/lois-de-la-monnaie/taux-d-interet-et-preference-temporelle",
  [ROUTE_NAME.MoneyLaws_3]: "/lois-de-la-monnaie/cycles-economiques",
  [ROUTE_NAME.MoneyLaws_4]: "/lois-de-la-monnaie/calcul-economique",
  [ROUTE_NAME.MoneyLaws_5]: "/lois-de-la-monnaie/ecole-autrichienne",
  [ROUTE_NAME.MoneyLaws_6]: "/lois-de-la-monnaie/quiz",

  [ROUTE_NAME.Bitcoin_1]: "/bitcoin/comment-fonctionne-bitcoin",
  [ROUTE_NAME.Bitcoin_2]: "/bitcoin/pourquoi-bitcoin-existe",
  [ROUTE_NAME.Bitcoin_3]: "/bitcoin/blockchain",
  [ROUTE_NAME.Bitcoin_4]: "/bitcoin/preuve-de-travail",
  [ROUTE_NAME.Bitcoin_5]: "/bitcoin/halving",
  [ROUTE_NAME.Bitcoin_6]: "/bitcoin/transactions-et-utxo",
  [ROUTE_NAME.Bitcoin_7]: "/bitcoin/cles-privees-et-signatures",
  [ROUTE_NAME.Bitcoin_8]: "/bitcoin/portefeuille-et-seed",
  [ROUTE_NAME.Bitcoin_9]: "/bitcoin/quiz",

  [ROUTE_NAME.GetStarted]: "/acheter-du-bitcoin",
  [ROUTE_NAME.Badges]: "/badges",

  // Reachable on purpose, so the page can be opened and reviewed like any
  // other. Every unclaimed address resolves here too.
  [ROUTE_NAME.NotFound]: "/404",
};
