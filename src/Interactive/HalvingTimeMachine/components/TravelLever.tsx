import { type FC } from "react";

import { Button } from "../../../Design";
import { useTranslation } from "../../../I18n";

import { Zap } from "@icons";

type Props = {
  traveling: boolean;
  onPull: () => void;
};

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
