import { type FC } from "react";

import { Button } from "../../../Design";
import { useTranslation } from "../../../I18n";

import { Zap } from "@icons";

type Props = {
  traveling: boolean;
  onPull: () => void;
};

/**
 * The travel trigger. The ledger refonte removed the brushed-metal 3D lever
 * (gradient shaft + radial knob + inset shadows) — a skeuomorphic gimmick that
 * merely duplicated this button. What remains is the `stamped` CTA, the
 * "official stamp" reserved for executing a simulation: a gold carré on a
 * hairline-boxed label, pressed like a cachet.
 */
export const TravelLever: FC<Props> = ({ traveling, onPull }) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="stamped"
      icon={<Zap size={14} strokeWidth={2.5} />}
      onClick={onPull}
      disabled={traveling}
    >
      {traveling ? t("halvingTimeMachine.leverTraveling") : t("halvingTimeMachine.lever")}
    </Button>
  );
};
