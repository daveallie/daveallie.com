import { ReactNode } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export type SlidesListQueryNode = {
  id: string;
  body: string & ReactNode;
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    year: string;
  };
};

export type SlidesListQueryResult = {
  allDeck: {
    nodes: SlidesListQueryNode[];
  };
};

export default function useSlidesListQuery(): SlidesListQueryResult {
  return useStaticQuery(graphql`
    query SlidesListQuery {
      allDeck(
        filter: {
          frontmatter: { published: { eq: true }, unlisted: { ne: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          id
          body
          frontmatter {
            title
            slug
            date(formatString: "ll")
            year: date(formatString: "YYYY")
          }
        }
      }
    }
  `);
}
