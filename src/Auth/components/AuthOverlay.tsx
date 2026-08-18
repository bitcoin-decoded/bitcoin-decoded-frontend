import { type FC, type ReactNode } from "react";

import { ModalShell } from "../../Design";
import { useTranslation } from "../../I18n";

type Props = {
  open: boolean;
  canGoBack: boolean;
  onBack: () => void;
  onClose: () => void;
  children: ReactNode;
};

// The onboarding modal shell (CDC §7). All the mechanics — portal, blurred backdrop,
// scroll lock, deliberate-close-only (no backdrop click, no Escape) — live in the
// shared Design `ModalShell`; here we only wire the auth flow's labels and back arrow.
export const AuthOverlay: FC<Props> = ({ open, canGoBack, onBack, onClose, children }) => {
  const { t } = useTranslation();

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      closeLabel={t("auth.a11y.close")}
      canGoBack={canGoBack}
      onBack={onBack}
      backLabel={t("auth.a11y.back")}
    >
      {children}
    </ModalShell>
  );
};
