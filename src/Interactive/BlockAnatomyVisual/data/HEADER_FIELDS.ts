import { Clock, GitMerge, Hash, Pickaxe } from "lucide-react";

import type { BlockField } from "../types";

export const HEADER_FIELDS: BlockField[] = [
  {
    icon: Hash,
    labelFr: "Hash du bloc précédent",
    labelEn: "Previous block hash",
    valueFr: "9023dc01…3d43ba",
    valueEn: "9023dc01…3d43ba",
  },
  {
    icon: GitMerge,
    labelFr: "Racine de Merkle",
    labelEn: "Merkle root",
    valueFr: "2290b31f…a9892e",
    valueEn: "2290b31f…a9892e",
  },
  {
    icon: Clock,
    labelFr: "Horodatage",
    labelEn: "Timestamp",
    valueFr: "2024-01-14 09:17:42 UTC",
    valueEn: "2024-01-14 09:17:42 UTC",
  },
  {
    icon: Pickaxe,
    labelFr: "Nonce",
    labelEn: "Nonce",
    valueFr: "748 291",
    valueEn: "748,291",
  },
];
