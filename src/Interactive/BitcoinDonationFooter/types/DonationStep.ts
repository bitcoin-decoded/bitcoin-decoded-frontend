/** Current screen in the donation journey state machine. */
export type DonationStep =
  | "gate"
  | "amount"
  | "lightning-invoice"
  | "onchain-address"
  | "no-wallet"
  | "thank-you";
