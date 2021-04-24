import React from 'react';
import SEO from '../components/SEO';
import Error404 from '../components/pages/404/Error404';
import useAlternateBodyBackground from '../hooks/useAlternateBodyBackground';
import '../assets/styles/global.scss';
import { graphql, useStaticQuery } from 'gatsby';

type SiteUrlQueryResult = {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
};

export default function Error404Page() {
  useAlternateBodyBackground('Hero');

  const data: SiteUrlQueryResult = useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  return (
    <>
      <SEO />
      <Error404 home={data.site.siteMetadata.siteUrl} />
    </>
  );
}
