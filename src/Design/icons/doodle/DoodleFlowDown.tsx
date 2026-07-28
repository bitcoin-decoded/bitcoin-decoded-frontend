import { DoodleIcon, type DoodleIconProps } from "./DoodleIcon";

// streamline data-transfer-vertical, retouched: the upward arrow is dropped and
// the remaining downward arrow is recentred in the viewBox.
const INNER = `<g transform="translate(-2.6 -6.12)"><path fill="currentColor" d="M14.504 12.450a34 34 0 0 0-.48 4.325c-.05.999 0 1.997 0 2.856c0 2.757.2 2.587-.09 2.247c-3.105-3.715-2.626-3.425-2.826-3.475s-.5.06-.34.47a44 44 0 0 0 2.587 4.114c.73.999 1.169 1.428 1.928.5c.569-.7 3.205-4.764 3.196-5.324a.34.34 0 0 0-.68 0c-.579.86-1.578 2.367-2.996 4.115c.19-2.407.29-2.826.35-5.153c.05-1.698-.11-4.265-.07-4.504a.301.301 0 1 0-.58-.17"/></g>`;

export const DoodleFlowDown = (props: Omit<DoodleIconProps, "inner" | "viewBox">) => (
  <DoodleIcon inner={INNER} viewBox="0 0 24 24" {...props} />
);
