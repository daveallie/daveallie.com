import { ReactNode } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export type SlidesListQueryNode = {
  id: string;
  body: string & ReactNode;
  frontmatter: {
    title: string;
    slug: string;
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
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          body
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);
}
