import { type FC, type ReactNode } from "react";

import { ModalShell } from "../../../Design";

type Props = {
  onClose: () => void;
  ariaLabel: string;
  closeLabel: string;
  children: ReactNode;
};

// The donation flow's modal: the same shared shell as the auth flow, so closing is
// deliberate only (the ✕, never a backdrop click or Escape).
export const DonationModal: FC<Props> = ({ onClose, ariaLabel, closeLabel, children }) => (
  <ModalShell open onClose={onClose} closeLabel={closeLabel} ariaLabel={ariaLabel}>
    {children}
  </ModalShell>
);
