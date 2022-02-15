import React from 'react';
import { graphql } from 'gatsby';
import PageFooter from '~/components/PageFooter';
import PageHeader from '~/components/PageHeader';
import SEO from '~/components/SEO';
import Text from '~/components/Text';
import BlogPostList from '~/components/pages/blog/BlogPostList';
import { BlogPostListQueryNode } from '~/hooks/queries/useBlogPostListQuery';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';

type BlogsByTagQueryResult = {
  allMdx: {
    nodes: BlogPostListQueryNode[];
  };
};

type BlogsByTagProps = {
  data: BlogsByTagQueryResult;
  pageContext: {
    tag: string;
    tagPath: string;
  };
};

export default function BlogsByTag({ data, pageContext }: BlogsByTagProps) {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();

  return (
    <>
      <SEO
        title={`Tag: ${pageContext.tag}`}
        path={pageContext.tagPath}
        mailerLite
      />
      <PageHeader title={`Tag: ${pageContext.tag}`} />
      <Text container="div" color="dark">
        <BlogPostList data={data.allMdx.nodes} />
      </Text>
      <PageFooter fixed />
    </>
  );
}

export const pageQuery = graphql`
  query BlogsByTagQuery($tag: String) {
    allMdx(
      filter: {
        frontmatter: {
          published: { eq: true }
          unlisted: { ne: true }
          tags: { eq: $tag }
        }
      }
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
`;
