// The screen the onboarding overlay is showing (CDC §7). The create wizard is a
// linear sequence; restore and import are their own short paths; "settings" is the
// signed-in account panel (§7.11). "closed" means the overlay is not open. Kept a
// union, no enum, per the project's conventions.
export type AuthFlowScreen =
  | "closed"
  | "landing"
  | "create.username"
  | "create.seed"
  | "create.confirm"
  | "create.password"
  | "create.overwrite"
  | "create.success"
  | "unlock"
  | "restore.seed"
  | "restore.setDevicePassword"
  | "import"
  | "settings"
  | "reveal.password"
  | "reveal.seed";
