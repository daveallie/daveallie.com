import { graphql, useStaticQuery } from 'gatsby';

export type SiteUrlQueryResult = {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
};

export default function useSiteUrlQuery(): SiteUrlQueryResult {
  return useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
}
