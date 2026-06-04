import { ROUTE_NAME, type RouteName } from "../../../Routing";

/**
 * Donation endpoints (spec §11). REPLACE the `TODO_` placeholders with the
 * real values before going live. While a value still starts with `TODO_`, the
 * matching gate renders a "not configured yet" notice instead of a fake
 * address — so no one can ever send funds into the void.
 *
 * - `onchainAddress`: a bech32 receive address (`bc1...`).
 * - `lightningAddress`: a Lightning Address (`name@domain.tld`) used for the
 *   LNURL-pay flow (the donor's wallet resolves it to a fresh invoice).
 * - `walletChapterRoute`: where the "no wallet" gate sends the reader.
 */
export const DONATION_CONFIG: {
  onchainAddress: string;
  lightningAddress: string;
  walletChapterRoute: RouteName;
} = {
  onchainAddress: "bc1q3dncsvrejuspm2vvxg6rjmlgedtkeq3d47pvz4",
  lightningAddress: "TODO_LIGHTNING_ADDRESS",
  walletChapterRoute: ROUTE_NAME.Bitcoin_9,
};
