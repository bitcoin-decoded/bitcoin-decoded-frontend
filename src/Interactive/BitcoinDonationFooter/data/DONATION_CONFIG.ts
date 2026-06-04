import { ROUTE_NAME, type RouteName } from "../../../Routing";

/**
 * Donation endpoints (spec §11). Replace the `TODO_` placeholder with the real
 * value before going live. While `onchainAddress` still starts with `TODO_`,
 * the address screen renders a "not configured yet" notice instead of a fake
 * address, so no one can ever send funds into the void.
 *
 * - `onchainAddress`: a bech32 receive address (`bc1...`).
 * - `walletChapterRoute`: where the "no wallet" screen sends the reader.
 */
export const DONATION_CONFIG: {
  onchainAddress: string;
  walletChapterRoute: RouteName;
} = {
  onchainAddress: "bc1q3dncsvrejuspm2vvxg6rjmlgedtkeq3d47pvz4",
  walletChapterRoute: ROUTE_NAME.Bitcoin_9,
};
