import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

type MetaEntry =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined };

type SEOProps = {
  description?: string;
  meta?: MetaEntry[];
  keywords?: string[];
  title?: string;
  path?: string;
  imageUrl?: string | null;
};

export default function SEO({
  description,
  meta,
  keywords,
  title,
  imageUrl = null,
  path = '',
}: SEOProps) {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);

  const metaDescription = description || data.site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      title={title ? title : data.site.siteMetadata.title}
      titleTemplate={title ? `%s | ${data.site.siteMetadata.title}` : ''}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title || data.site.siteMetadata.title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: process.env.SUBSITE === 'blog' ? 'article' : 'website',
        },
        {
          property: 'og:site_name',
          content: 'Dave Allie',
        },
        {
          property: 'og:url',
          content: `${data.site.siteMetadata.siteUrl}${path}`,
        },

        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title || data.site.siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]
        .concat(
          keywords && keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
            : []
        )
        .concat(
          imageUrl
            ? [
                {
                  name: 'twitter:image',
                  content: `${data.site.siteMetadata.siteUrl}${imageUrl}`,
                },
                {
                  name: 'og:image',
                  content: `${data.site.siteMetadata.siteUrl}${imageUrl}`,
                },
              ]
            : []
        )
        .concat(meta || [])}
    />
  );
}
