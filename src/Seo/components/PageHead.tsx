import { type FC } from "react";

import { SITE } from "../data";
import { usePageHead } from "../hooks";

/**
 * Per-route metadata. React 19 hoists `<title>`, `<meta>` and `<link>` rendered
 * anywhere in the tree into `<head>`, so no imperative DOM writing and no
 * helmet library, and the build finds them there when it writes each page out.
 *
 * `og:image` is still absent: there is no share image to point at, and naming
 * one that does not exist would break every social card rather than leave it
 * plain.
 */
export const PageHead: FC = () => {
  const { title, description, locale, noindex, canonical } = usePageHead();

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
    </>
  );
};
