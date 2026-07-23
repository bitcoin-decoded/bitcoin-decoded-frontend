import { type FC } from "react";

import { Button, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";

type Props = {
  onClick: () => void;
  blockNumber: number;
  disabled?: boolean;
};

export const ModifyTxButton: FC<Props> = ({ onClick, blockNumber, disabled = false }) => {
  const { t } = useTranslation();
  const { colors } = usePageTheme();

  return (
    <Button
      variant="secondary"
      size="sm"
      color={colors.semantic.error.text}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      ariaLabel={`${t("chain.editTx")} #${blockNumber}`}
    >
      {t("chain.modifyTx")}
    </Button>
  );
};
