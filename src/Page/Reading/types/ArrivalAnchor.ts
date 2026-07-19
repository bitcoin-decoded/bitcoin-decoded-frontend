/** Where a reader should land when a block-reading chapter opens. */
export type ArrivalAnchor = { type: "top" } | { type: "block"; index: number };
