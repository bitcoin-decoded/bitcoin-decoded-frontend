/** A BOLT11 invoice resolved from a Lightning Address via LNURL-pay. */
export type LightningInvoice = {
  /** BOLT11 payment request string. */
  bolt11: string;
  /** Amount the invoice was requested for, in sats. */
  amountSats: number;
  /** Epoch ms after which the invoice is considered expired. */
  expiresAt: number;
};
