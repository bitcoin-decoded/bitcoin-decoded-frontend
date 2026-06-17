import {
  ArrowLeftRight,
  Bitcoin,
  Blocks,
  Coins,
  Compass,
  Cpu,
  EyeOff,
  Flame,
  Hourglass,
  KeyRound,
  Landmark,
  Layers,
  Network,
  ScrollText,
  TrendingUp,
  Trophy,
  Wallet,
  Waves,
  Wrench,
  Zap,
} from "lucide-react";

import { ROUTE_NAME } from "../../Routing";
import type { Badge } from "../types";

/**
 * The full catalog, in display order (each module's chapters, then its
 * synthesis-quiz trophy). Chapter badge ids ARE the chapter route names, so the
 * reading engine can award by `chapterId`; names reuse the chapter's nav title.
 * Module-quiz badges use dedicated ids + names.
 */
export const BADGES: Badge[] = [
  // ── Module 1 — Le système bancaire (blue) ─────────────────────────────────
  {
    id: ROUTE_NAME.Banking_1,
    kind: "chapter",
    module: "banking",
    icon: Landmark,
    nameKey: "nav.tree.moneyOrigin",
  },
  {
    id: ROUTE_NAME.Banking_2,
    kind: "chapter",
    module: "banking",
    icon: Layers,
    nameKey: "nav.tree.twoLevels",
  },
  {
    id: ROUTE_NAME.Banking_3,
    kind: "chapter",
    module: "banking",
    icon: Zap,
    nameKey: "nav.tree.qe",
  },
  {
    id: ROUTE_NAME.Banking_4,
    kind: "chapter",
    module: "banking",
    icon: Wrench,
    nameKey: "nav.tree.brokenEngine",
  },
  {
    id: ROUTE_NAME.Banking_5,
    kind: "chapter",
    module: "banking",
    icon: TrendingUp,
    nameKey: "nav.tree.cantillon",
  },
  {
    id: ROUTE_NAME.Banking_6,
    kind: "chapter",
    module: "banking",
    icon: Flame,
    nameKey: "nav.tree.inflation",
  },
  {
    id: "module-banking-quiz",
    kind: "module",
    module: "banking",
    icon: Trophy,
    nameKey: "badges.moduleQuiz.banking",
  },

  // ── Module 2 — Les lois de la monnaie (violet) ────────────────────────────
  {
    id: ROUTE_NAME.MoneyLaws_1,
    kind: "chapter",
    module: "moneyLaws",
    icon: Coins,
    nameKey: "nav.tree.whatIsMoney",
  },
  {
    id: ROUTE_NAME.MoneyLaws_2,
    kind: "chapter",
    module: "moneyLaws",
    icon: Hourglass,
    nameKey: "nav.tree.priceOfTime",
  },
  {
    id: ROUTE_NAME.MoneyLaws_3,
    kind: "chapter",
    module: "moneyLaws",
    icon: Waves,
    nameKey: "nav.tree.economicCycles",
  },
  {
    id: ROUTE_NAME.MoneyLaws_4,
    kind: "chapter",
    module: "moneyLaws",
    icon: EyeOff,
    nameKey: "nav.tree.socialismProblem",
  },
  {
    id: ROUTE_NAME.MoneyLaws_5,
    kind: "chapter",
    module: "moneyLaws",
    icon: Compass,
    nameKey: "nav.tree.austrianMethod",
  },
  {
    id: "module-money-laws-quiz",
    kind: "module",
    module: "moneyLaws",
    icon: Trophy,
    nameKey: "badges.moduleQuiz.moneyLaws",
  },

  // ── Module 3 — Bitcoin (amber) ────────────────────────────────────────────
  {
    id: ROUTE_NAME.Bitcoin_1,
    kind: "chapter",
    module: "bitcoin",
    icon: Network,
    nameKey: "nav.tree.howBitcoinWorks",
  },
  {
    id: ROUTE_NAME.Bitcoin_2,
    kind: "chapter",
    module: "bitcoin",
    icon: ScrollText,
    nameKey: "nav.tree.whyBitcoin",
  },
  {
    id: ROUTE_NAME.Bitcoin_3,
    kind: "chapter",
    module: "bitcoin",
    icon: Blocks,
    nameKey: "nav.tree.blockchain",
  },
  {
    id: ROUTE_NAME.Bitcoin_4,
    kind: "chapter",
    module: "bitcoin",
    icon: Cpu,
    nameKey: "nav.tree.proofOfWork",
  },
  {
    id: ROUTE_NAME.Bitcoin_5,
    kind: "chapter",
    module: "bitcoin",
    icon: Bitcoin,
    nameKey: "nav.tree.rewardAndHalving",
  },
  {
    id: ROUTE_NAME.Bitcoin_6,
    kind: "chapter",
    module: "bitcoin",
    icon: ArrowLeftRight,
    nameKey: "nav.tree.utxoAndTransactions",
  },
  {
    id: ROUTE_NAME.Bitcoin_7,
    kind: "chapter",
    module: "bitcoin",
    icon: KeyRound,
    nameKey: "nav.tree.keysAndSignatures",
  },
  {
    id: ROUTE_NAME.Bitcoin_8,
    kind: "chapter",
    module: "bitcoin",
    icon: Wallet,
    nameKey: "nav.tree.walletsAndSeed",
  },
  {
    id: "module-bitcoin-quiz",
    kind: "module",
    module: "bitcoin",
    icon: Trophy,
    nameKey: "badges.moduleQuiz.bitcoin",
  },
];
