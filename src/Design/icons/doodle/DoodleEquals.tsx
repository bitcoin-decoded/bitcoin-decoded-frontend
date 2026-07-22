import { DoodleIcon, type DoodleIconProps } from "./DoodleIcon";

const INNER = `<path fill="currentColor" d="M3.6 9.02C8.2 8.58 14.1 8.28 20.38 8.36L20.34 9.74C14.05 9.66 8.35 10.02 3.74 10.62Z"/><path fill="currentColor" d="M3.74 14.58C9.1 14.2 14.3 13.9 20.3 14.0L20.26 15.48C14.2 15.38 9.0 15.68 3.94 16.24Z"/>`;

export const DoodleEquals = (props: Omit<DoodleIconProps, "inner" | "viewBox">) => (
  <DoodleIcon inner={INNER} viewBox="0 0 24 24" {...props} />
);
