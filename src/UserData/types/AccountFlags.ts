// Tells the composite repository whether this device has an account and whether
// its local progress has already been folded into it. Injected rather than read
// from storage inside the composite, so the selection logic stays testable
// without a browser; createDefaultRepository is what binds these to localStorage.
export type AccountFlags = {
  hasAccount: () => boolean;
  migrated: () => boolean;
  setMigrated: () => void;
};
