import { type CSSProperties, type FC } from "react";

import { Button, FeedbackPanel } from "../../Design";
import { useTranslation } from "../../I18n";

import { DoodleWarningTriangle } from "@doodle";

type Props = {
  onRetry: () => void;
};

// Shown only if the load rejects or outruns the timeout: never a spinner that
// spins forever. Offers a retry (re-runs the load) and a hard reload.
export const UserDataError: FC<Props> = ({ onRetry }) => {
  const { t } = useTranslation();

  const wrapStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  };

  const cardStyle: CSSProperties = {
    width: "100%",
    maxWidth: "26rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  return (
    <div style={wrapStyle}>
      <div style={cardStyle}>
        <FeedbackPanel
          tone="error"
          title={t("userData.error.title")}
          icon={<DoodleWarningTriangle size={22} aria-hidden />}
        >
          <p style={{ margin: 0 }}>{t("userData.error.body")}</p>
        </FeedbackPanel>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Button variant="primary" onClick={onRetry}>
            {t("userData.error.retry")}
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            {t("userData.error.reload")}
          </Button>
        </div>
      </div>
    </div>
  );
};
