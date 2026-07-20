/**
 * Whether a browser is present.
 *
 * The build renders every route to HTML under Node, where `window`,
 * `localStorage` and `matchMedia` do not exist. Reading any of them while a
 * component initialises throws there and takes the whole page down, so the few
 * places that do are routed through this.
 */
export const isBrowser = typeof window !== "undefined";
