export type FieldTone = "secret" | "public" | "neutral";

export type ValueKind = "hex" | "text";

export type StatusTone = "success" | "error" | "muted";

export type ActionButtonVariant = "primary" | "verify";

/**
 * Bundled colors used across the SignaturePlayground sub-components.
 * Keeps prop signatures of inner components readable (one `colors` prop
 * vs ~9 individual color strings).
 */
export type SigPlaygroundColors = {
  accentColor: string;
  successColor: string;
  errorColor: string;
  neutralColor: string;
  worldBorderSecondary: string;
  basePrimaryText: string;
  baseTextSecondary: string;
  baseBorderSecondary: string;
  baseBackgroundSecondary: string;
};
