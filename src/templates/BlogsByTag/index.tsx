import React from 'react';
import { graphql } from 'gatsby';
import ContentBlock from '~/components/ContentBlock';
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
      <SEO title={`Tag: ${pageContext.tag}`} path={pageContext.tagPath} />
      <PageHeader title={`Tag: ${pageContext.tag}`} />
      <Text container="div" color="dark">
        <ContentBlock>
          <BlogPostList data={data.allMdx.nodes} />
        </ContentBlock>
      </Text>
      <PageFooter fixed />
    </>
  );
}

export const pageQuery = graphql`
  query BlogsByTagQuery($tag: String) {
    allMdx(
      filter: { frontmatter: { published: { eq: true }, tags: { eq: $tag } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          date(formatString: "ll")
          year: date(formatString: "YYYY")
        }
      }
    }
  }
`;
