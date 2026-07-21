// Per-route metadata. Only the component crosses the boundary: the shell
// mounts it once and every route is covered.
export { PageHead } from "./components";
// `SITE` is public for the build, which writes the sitemap and needs the
// absolute address. Components never need it: they render a canonical from
// `buildCanonicalUrl`, which reads it here.
export { SITE } from "./data";
