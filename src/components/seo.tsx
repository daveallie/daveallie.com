import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

type MetaEntry =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined };

type SEOProps = {
  description?: string;
  meta?: MetaEntry[];
  keywords?: string[];
  title?: string;
};

export default function SEO({ description, meta, keywords, title }: SEOProps) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang: 'en',
            }}
            title={title ? title : data.site.siteMetadata.title}
            titleTemplate={title ? `%s | ${data.site.siteMetadata.title}` : ''}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title || data.site.siteMetadata.title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title || data.site.siteMetadata.title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta || [])}
          />
        );
      }}
    />
  );
}
