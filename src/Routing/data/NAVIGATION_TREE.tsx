import type { NavigationItem } from "../types";
import type { TranslationFn } from "../../I18n";
import { ROUTE_NAME } from "./ROUTE_NAME";

export const getNavigationTree = (
  t: TranslationFn
): NavigationItem[] => [
  {
    label: t("nav.tree.bankingSystem"),
    isPage: false,
    children: [
      {
        id: ROUTE_NAME.Banking_1,
        label: t("nav.tree.moneyOrigin"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Banking_2,
        label: t("nav.tree.twoLevels"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Banking_3,
        label: t("nav.tree.qe"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Banking_4,
        label: t("nav.tree.brokenEngine"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Banking_5,
        label: t("nav.tree.cantillon"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Banking_6,
        label: t("nav.tree.inflation"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Banking_7,
        label: t("nav.tree.synthesis"),
        isPage: true,
      },
    ],
  },
  {
    label: t("nav.tree.moneyLaws"),
    isPage: false,
    children: [
      {
        id: ROUTE_NAME.MoneyLaws_1,
        label: t("nav.tree.whatIsMoney"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.MoneyLaws_2,
        label: t("nav.tree.economicCycles"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.MoneyLaws_3,
        label: t("nav.tree.socialismProblem"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.MoneyLaws_4,
        label: t("nav.tree.austrianMethod"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.MoneyLaws_5,
        label: t("nav.tree.orangeSynthesis"),
        isPage: true,
      },
    ],
  },
  {
    label: t("nav.tree.bitcoinRevolution"),
    isPage: false,
    children: [
      {
        id: ROUTE_NAME.Bitcoin_1,
        label: t("nav.tree.howBitcoinWorks"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Bitcoin_2,
        label: t("nav.tree.whyBitcoin"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Bitcoin_3,
        label: t("nav.tree.blockchain"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Bitcoin_4,
        label: t("nav.tree.proofOfWork"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Bitcoin_5,
        label: t("nav.tree.rewardAndHalving"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Bitcoin_6,
        label: t("nav.tree.utxoAndTransactions"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Bitcoin_7,
        label: t("nav.tree.keysAndSignatures"),
        isPage: true,
      },
      {
        id: ROUTE_NAME.Bitcoin_8,
        label: t("nav.tree.walletsAndSeed"),
        isPage: true,
      },
      {
        label: t("nav.tree.getStarted"),
        isPage: true,
      },
    ],
  },
];
