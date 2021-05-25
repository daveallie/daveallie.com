import { graphql, useStaticQuery } from 'gatsby';

export type BlogPostListQueryNode = {
  id: string;
  frontmatter: {
    title: string;
    description: string;
    slug: string;
    date: string;
    year: string;
  };
};

export type BlogPostListQueryResult = {
  allMdx: {
    nodes: BlogPostListQueryNode[];
  };
};

export default function useBlogPostListQuery(): BlogPostListQueryResult {
  return useStaticQuery(graphql`
    query BlogPostListQuery {
      allMdx(
        filter: { frontmatter: { published: { eq: true } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          id
          frontmatter {
            title
            description
            slug
            date(formatString: "ll")
            year: date(formatString: "YYYY")
          }
        }
      }
    }
  `);
}
