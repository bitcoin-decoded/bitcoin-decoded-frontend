import { type FC } from "react";

import { SITE } from "../data";
import { usePageHead } from "../hooks";

export const PageHead: FC = () => {
  const { title, description, locale, noindex, canonical, alternates, structuredData } =
    usePageHead();

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {canonical && <link rel="canonical" href={canonical} />}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      {alternates.map((alternate) => (
        <link
          key={alternate.hreflang}
          rel="alternate"
          hrefLang={alternate.hreflang}
          href={alternate.href}
        />
      ))}

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
    </>
  );
};
