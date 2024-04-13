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
  mailerLite?: boolean;
};

export default function SEO({
  description,
  meta,
  keywords,
  title,
  imageUrl = null,
  path = '',
  mailerLite,
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
    // @ts-ignore
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      title={title ? title : data.site.siteMetadata.title}
      titleTemplate={title ? `%s | ${data.site.siteMetadata.title}` : ''}
      meta={[
        {
          name: 'title',
          content: title || data.site.siteMetadata.title,
        },
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
          content: 'summary_large_image',
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
            : [],
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
            : [],
        )
        .concat(meta || [])}
    >
      {mailerLite && (
        <script
          children={`
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '562646');
          `}
        />
      )}
    </Helmet>
  );
}
