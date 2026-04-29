import { Clock, Hash, Pickaxe, GitMerge, List } from "lucide-react";
import type { BlockField } from "../types";

export const HEADER_FIELDS: BlockField[] = [
  {
    icon: Hash,
    labelFr: "Hash du bloc précédent",
    labelEn: "Previous block hash",
    valueFr: "00000000000000000002a7c4…e9f3b",
    valueEn: "00000000000000000002a7c4…e9f3b",
  },
  {
    icon: GitMerge,
    labelFr: "Racine de Merkle",
    labelEn: "Merkle root",
    valueFr: "7f83b165…4c9b2e3a",
    valueEn: "7f83b165…4c9b2e3a",
  },
  {
    icon: Clock,
    labelFr: "Horodatage",
    labelEn: "Timestamp",
    valueFr: "2024-01-15 14:32:07 UTC",
    valueEn: "2024-01-15 14:32:07 UTC",
  },
  {
    icon: Pickaxe,
    labelFr: "Nonce",
    labelEn: "Nonce",
    valueFr: "2 083 236 893",
    valueEn: "2,083,236,893",
  },
];

export const BODY_FIELDS: BlockField[] = [
  {
    icon: List,
    labelFr: "Transactions",
    labelEn: "Transactions",
    valueFr: "3 240 transactions",
    valueEn: "3,240 transactions",
  },
];
