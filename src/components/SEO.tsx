import React, { ReactNode } from 'react';
import siteMetadata from '../../config/util/siteMetadata';

export type MetaEntry = {
  name?: string;
  property?: string;
  content: string;
};

type SEOProps = {
  description?: string;
  meta?: MetaEntry[];
  keywords?: string[];
  title?: string;
  path?: string;
  imageUrl?: string | null;
  mailerLite?: boolean;
  children?: ReactNode;
};

const MAILER_LITE_SNIPPET = `
  (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
  .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
  n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
  (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
  ml('account', '562646');
`;

export default function SEO({
  description,
  meta = [],
  keywords,
  title,
  imageUrl = null,
  path = '',
  mailerLite,
  children,
}: SEOProps) {
  const metaDescription = description || siteMetadata.description;
  const displayTitle = title || siteMetadata.title;

  const metaEntries: MetaEntry[] = [
    { name: 'title', property: 'og:title', content: displayTitle },
    { name: 'twitter:title', content: displayTitle },
    { property: 'og:site_name', content: 'Dave Allie' },
    {
      property: 'og:type',
      content: process.env.SUBSITE === 'blog' ? 'article' : 'website',
    },
    { property: 'og:url', content: `${siteMetadata.siteUrl}${path}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(imageUrl
      ? [
          {
            name: 'image',
            property: 'og:image',
            content: `${siteMetadata.siteUrl}${imageUrl}`,
          },
          {
            name: 'twitter:image',
            content: `${siteMetadata.siteUrl}${imageUrl}`,
          },
        ]
      : []),
    // Description last to avoid pushing image out of content window
    {
      name: 'description',
      property: 'og:description',
      content: metaDescription,
    },
    { name: 'twitter:description', content: metaDescription },
    ...(keywords && keywords.length > 0
      ? [{ name: 'keywords', content: keywords.join(', ') }]
      : []),
    ...meta,
  ];

  return (
    <>
      <title>
        {title ? `${title} | ${siteMetadata.title}` : siteMetadata.title}
      </title>
      {metaEntries.map((entry) => (
        <meta key={entry.name || entry.property} {...entry} />
      ))}
      {mailerLite && (
        // eslint-disable-next-line react/no-danger
        <script dangerouslySetInnerHTML={{ __html: MAILER_LITE_SNIPPET }} />
      )}
      {children}
    </>
  );
}
