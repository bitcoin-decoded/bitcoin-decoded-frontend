/**
 * Everything about *where* the site lives, in one place.
 *
 * The domain is not bought yet. It is needed only by `canonical`, `og:url` and
 * the future sitemap, none of which ship before the static prerender. Isolating
 * it here means the day it is decided, this is the only line to change.
 */
export const SITE = {
  // TODO: confirm at deployment. Nothing else in the codebase knows the domain.
  url: "https://bitcoin-decoded.fr",
  name: "Bitcoin.Decoded",
  twitter: "",
} as const;
