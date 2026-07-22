// One HTML file per route and language, for crawlers. See docs/seo.md.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const DIST = "dist";
const SSR_ENTRY = "../dist-ssr/entry-server.js";
const NL = "\n";

// React 19 emits the tags it would hoist first and contiguously, so the head
// block is however many of them sit at the very start.
const splitHead = (html) => {
  const HEAD_TAG = /^<(?:title>[\s\S]*?<\/title|(?:meta|link)\b[^>]*\/?)>/;
  let cut = 0;
  for (;;) {
    const match = html.slice(cut).match(HEAD_TAG);
    if (!match) break;
    cut += match[0].length;
  }
  return { head: html.slice(0, cut), body: html.slice(cut) };
};

// Flat `.html`, never `<path>/index.html`: a directory only resolves to its
// index when the address ends in a slash, and these addresses do not.
const fileFor = (path) => (path === "/" ? join(DIST, "index.html") : join(DIST, `${path}.html`));

// Built from the same list as the files, so it cannot drift from them.
const sitemapFor = (pages, site) => {
  const urls = pages
    .filter((page) => page.listed)
    .map((page) => {
      const links = page.alternates.map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${alt.language}" href="${site.url}${alt.path}"/>`,
      );
      return ["  <url>", `    <loc>${site.url}${page.path}</loc>`, ...links, "  </url>"].join(NL);
    })
    .join(NL);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    "</urlset>",
    "",
  ].join(NL);
};

const main = async () => {
  const { render, pages, site } = await import(SSR_ENTRY);
  const shell = await readFile(join(DIST, "index.html"), "utf8");

  if (!shell.includes('<div id="root"></div>')) {
    throw new Error("The built shell no longer has an empty #root to fill.");
  }
  if (!shell.includes('<html lang="fr">')) {
    throw new Error("The built shell no longer declares a language to replace.");
  }

  // Counted rather than silenced: a silent channel is how the missing keys
  // survived five phases unnoticed.
  const noisy = console.error;
  let warnings = 0;
  console.error = (...args) => {
    warnings += 1;
    if (warnings <= 3) noisy(...args);
  };

  const written = [];
  for (const { route, language, path } of pages) {
    const { head, body } = splitHead(render(route, language));

    const html = shell
      .replace('<html lang="fr">', `<html lang="${language}">`)
      .replace("</head>", `${head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

    const file = fileFor(path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, "utf8");
    written.push({ path, language, bytes: html.length });
  }

  console.error = noisy;

  await writeFile(join(DIST, "sitemap.xml"), sitemapFor(pages, site), "utf8");

  const total = written.reduce((sum, page) => sum + page.bytes, 0);
  const byLanguage = written.reduce((counts, page) => {
    counts[page.language] = (counts[page.language] ?? 0) + 1;
    return counts;
  }, {});

  console.log(`Prerendered ${written.length} pages, ${(total / 1024).toFixed(0)} kB of HTML`);
  console.log(
    `  ${Object.entries(byLanguage)
      .map(([language, count]) => `${count} ${language}`)
      .join(", ")}`,
  );
  console.log(`Sitemap lists ${pages.filter((page) => page.listed).length} of them`);
  console.log(
    warnings === 0
      ? "No React warnings across the 52 renders"
      : `${warnings} React warnings across the 52 renders, see the first few above`,
  );
};

await main();
