// The reload rule, kept pure so it is pinned by a test without a DOM. Once the
// auth status has settled out of "checking" (settled !== null), a flip of the
// authenticated flag is a genuine in-visit account change and must reload the
// repository. The very first settle only records the baseline: the mount load
// already read the vault directly, so there is nothing to redo.
export const resolveAccountReload = (
  settled: boolean | null,
  authenticated: boolean,
): { settled: boolean; shouldReload: boolean } => ({
  settled: authenticated,
  shouldReload: settled !== null && settled !== authenticated,
});
