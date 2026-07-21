/**
 * Everything `PageHead` renders that React 19 lifts into `<head>`.
 *
 * The JSON-LD script is deliberately absent: React does not hoist `<script>`,
 * so it stays inside `#root` and `createRoot` replaces it along with the rest
 * of the markup. Nothing `index.html` declares matches either. It carries no
 * title, no description and no canonical, on purpose, and its own tags (the
 * icon, the preconnects, the stylesheet, the theme script) are not in this
 * list.
 */
const HOISTED_BY_PAGE_HEAD = [
  "title",
  "meta[name='description']",
  "meta[name='robots']",
  "link[rel='canonical']",
  "link[rel='alternate'][hreflang]",
  "meta[property^='og:']",
].join(",");

/**
 * Drops the metadata the build wrote into `<head>`, so the client's own render
 * does not come to sit beside it.
 *
 * The client mounts with `createRoot`, not `hydrateRoot`, and that is on
 * purpose: theme, badges and reading position come from storage the build
 * cannot see. The cost is that React has no way of knowing the tags already in
 * `<head>` are the ones it is about to render, so `PageHead` produced a second
 * copy of each. Two titles, two canonicals, six `hreflang` links.
 *
 * Never urgent, since the duplicates are identical rather than contradictory
 * and a crawler reads the raw HTML before it renders anything. Worth removing
 * all the same: Google documents ignoring `rel=canonical` altogether when it
 * finds more than one, and there is nothing to gain from making it arbitrate.
 *
 * Call before mounting. Afterwards the prerendered tags and React's own are
 * indistinguishable by selector.
 */
export const dropPrerenderedHead = () => {
  document.head.querySelectorAll(HOISTED_BY_PAGE_HEAD).forEach((tag) => tag.remove());
};
