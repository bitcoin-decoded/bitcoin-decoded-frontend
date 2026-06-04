import { type FC, type ReactNode } from "react";

import { SurfaceCard, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getDonationCopy } from "../data";
import { useBitcoinDonationFooter } from "../hooks";
import type { DonationDisplayMode } from "../types";

import { DonationAmountSelector } from "./DonationAmountSelector";
import { DonationFooterButton } from "./DonationFooterButton";
import { DonationGateSelector } from "./DonationGateSelector";
import { DonationModal } from "./DonationModal";
import { DonationThankYou } from "./DonationThankYou";
import { LightningInvoiceDisplay } from "./LightningInvoiceDisplay";
import { NoWalletRedirect } from "./NoWalletRedirect";
import { OnchainAddressDisplay } from "./OnchainAddressDisplay";

type Props = {
  /** `footer` (default): chrome button + modal. `inline`: expanded chapter block. */
  display?: DonationDisplayMode;
};

/**
 * Orchestrates the donation journey (spec §17). Two display modes share one
 * state machine: a discreet footer button that opens a modal, or an expanded
 * inline block embedded at the end of a chapter.
 */
export const BitcoinDonationFooter: FC<Props> = ({ display = "footer" }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);
  const journey = useBitcoinDonationFooter();

  const finish = display === "footer" ? journey.close : journey.reset;

  const renderStep = (): ReactNode => {
    switch (journey.step) {
      case "gate":
        return <DonationGateSelector onSelect={journey.selectGate} />;
      case "amount":
        return (
          <DonationAmountSelector
            gate={journey.gate ?? "lightning"}
            amountEur={journey.amountEur}
            onAmount={journey.setAmount}
            onProceed={journey.proceedFromAmount}
            onBack={journey.back}
            onSwitchToLightning={journey.switchToLightning}
          />
        );
      case "lightning-invoice":
        return (
          <LightningInvoiceDisplay
            amountEur={journey.amountEur}
            onBack={journey.back}
            onPaid={journey.confirmPaid}
          />
        );
      case "onchain-address":
        return (
          <OnchainAddressDisplay
            amountEur={journey.amountEur}
            onBack={journey.back}
            onSent={journey.confirmPaid}
          />
        );
      case "no-wallet":
        return <NoWalletRedirect onClose={finish} />;
      case "thank-you":
        return <DonationThankYou onContinue={finish} />;
      default:
        return null;
    }
  };

  // `key` on the step re-triggers the fade-in on every transition (spec §15).
  const screen = (
    <div key={journey.step} style={{ animation: "donationFade 200ms var(--ease-smooth) both" }}>
      {renderStep()}
    </div>
  );

  if (display === "inline") {
    return (
      <SurfaceCard
        glowColor={colors.amber.border.secondary}
        fillColor={colors.amber.background.primary}
        margin="2rem 0"
      >
        {screen}
      </SurfaceCard>
    );
  }

  return (
    <>
      <DonationFooterButton onClick={journey.open} />
      {journey.isOpen && (
        <DonationModal onClose={journey.close} ariaLabel={copy.gate.title} closeLabel={copy.close}>
          {screen}
        </DonationModal>
      )}
    </>
  );
};
