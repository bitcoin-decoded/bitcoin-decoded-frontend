import { type FC, type ReactNode } from "react";

import { SurfaceCard, usePageTheme } from "../../../Design";
import { useTranslation } from "../../../I18n";
import { getDonationCopy } from "../data";
import { useBitcoinDonationFooter } from "../hooks";
import type { DonationDisplayMode } from "../types";

import { DonationAmountSelector } from "./DonationAmountSelector";
import { DonationFooterButton } from "./DonationFooterButton";
import { DonationModal } from "./DonationModal";
import { DonationThankYou } from "./DonationThankYou";
import { NoWalletRedirect } from "./NoWalletRedirect";
import { OnchainAddressDisplay } from "./OnchainAddressDisplay";

type Props = {
  /** `footer` (default): chrome button + modal. `inline`: expanded chapter block. */
  display?: DonationDisplayMode;
};

/**
 * Orchestrates the donation journey (v2, on-chain only). Both display modes
 * share one state machine and open straight on the amount selector: a discreet
 * footer button that opens a modal, or an expanded inline block at the end of a
 * chapter.
 */
export const BitcoinDonationFooter: FC<Props> = ({ display = "footer" }) => {
  const { colors } = usePageTheme();
  const { language } = useTranslation();
  const copy = getDonationCopy(language);
  const journey = useBitcoinDonationFooter();

  // Leaving the entry (amount) or finishing closes the modal in footer mode,
  // and resets the flow in inline mode.
  const exit = display === "footer" ? journey.close : journey.reset;

  const renderStep = (): ReactNode => {
    switch (journey.step) {
      case "amount":
        return (
          <DonationAmountSelector
            amountEur={journey.amountEur}
            onAmount={journey.setAmount}
            onProceed={journey.proceedFromAmount}
            onBack={exit}
            onNoWallet={journey.goToNoWallet}
          />
        );
      case "onchain-address":
        return (
          <OnchainAddressDisplay
            amountEur={journey.amountEur}
            onBack={journey.back}
            onSent={journey.confirmSent}
          />
        );
      case "no-wallet":
        return <NoWalletRedirect onClose={journey.back} />;
      case "thank-you":
        return <DonationThankYou onContinue={exit} />;
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
