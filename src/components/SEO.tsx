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
    >
      {mailerLite && (
        <script
          children={`
            (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
            var c={ a:arguments,q:[]};var r=this.push(c);return "number" !=typeof r?r:f.bind(c.q);}
            f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
            var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
            _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

            var ml_account = ml('accounts', '3822203', 't5f7k3w2h6', 'load');
          `}
        />
      )}
    </Helmet>
  );
}
