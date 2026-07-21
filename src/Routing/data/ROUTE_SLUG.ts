import type { Language } from "../../I18n";
import type { RouteName } from "../types/RouteName";

import { ROUTE_NAME } from "./ROUTE_NAME";

/**
 * Each route's address in each language, before the language prefix.
 *
 * The two sets are translations of intent, not of words: both lead with the
 * term someone would actually search in that language. A few coincide because
 * the term itself does, which is a fact about the vocabulary rather than an
 * oversight.
 */
export const ROUTE_SLUG: Record<Language, Record<RouteName, string>> = {
  fr: {
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
    [ROUTE_NAME.NotFound]: "/404",
  },
  en: {
    [ROUTE_NAME.HomePage]: "/",

    [ROUTE_NAME.Banking_1]: "/banking-system/money-creation",
    [ROUTE_NAME.Banking_2]: "/banking-system/central-and-commercial-money",
    [ROUTE_NAME.Banking_3]: "/banking-system/quantitative-easing",
    [ROUTE_NAME.Banking_4]: "/banking-system/credit-allocation",
    [ROUTE_NAME.Banking_5]: "/banking-system/cantillon-effect",
    [ROUTE_NAME.Banking_6]: "/banking-system/inflation",
    [ROUTE_NAME.Banking_7]: "/banking-system/quiz",

    [ROUTE_NAME.MoneyLaws_1]: "/laws-of-money/what-is-money",
    [ROUTE_NAME.MoneyLaws_2]: "/laws-of-money/interest-rates-and-time-preference",
    [ROUTE_NAME.MoneyLaws_3]: "/laws-of-money/business-cycles",
    [ROUTE_NAME.MoneyLaws_4]: "/laws-of-money/economic-calculation",
    [ROUTE_NAME.MoneyLaws_5]: "/laws-of-money/austrian-school",
    [ROUTE_NAME.MoneyLaws_6]: "/laws-of-money/quiz",

    [ROUTE_NAME.Bitcoin_1]: "/bitcoin/how-bitcoin-works",
    [ROUTE_NAME.Bitcoin_2]: "/bitcoin/why-bitcoin-exists",
    [ROUTE_NAME.Bitcoin_3]: "/bitcoin/blockchain",
    [ROUTE_NAME.Bitcoin_4]: "/bitcoin/proof-of-work",
    [ROUTE_NAME.Bitcoin_5]: "/bitcoin/halving",
    [ROUTE_NAME.Bitcoin_6]: "/bitcoin/transactions-and-utxos",
    [ROUTE_NAME.Bitcoin_7]: "/bitcoin/private-keys-and-signatures",
    [ROUTE_NAME.Bitcoin_8]: "/bitcoin/wallet-and-seed",
    [ROUTE_NAME.Bitcoin_9]: "/bitcoin/quiz",

    [ROUTE_NAME.GetStarted]: "/buy-bitcoin",
    [ROUTE_NAME.Badges]: "/badges",
    [ROUTE_NAME.NotFound]: "/404",
  },
};
