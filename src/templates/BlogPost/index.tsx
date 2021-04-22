import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Link from '../../components/Link';
import Text from '../../components/Text';
import HR from '../../components/HR';
import SEO from '../../components/SEO';
import { FigureMDXWrapper } from '../../components/Figure';
import useAlternateBodyBackground from '../../hooks/useAlternateBodyBackground';
import ContentBlock from '../../components/ContentBlock';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import { BlockQuoteMDXWrapper } from '../../components/BlockQuote';
import { CodeMDXWrapper } from '../../components/Code';
import P from '../../components/P';
import BlogHeader from '../../components/pages/blog/BlogHeader';
import BlogFooter from '../../components/pages/blog/BlogFooter';

type BlogPostQueryResult = {
  data: {
    mdx: {
      id: string;
      body: string & ReactNode;
      timeToRead: number;
      frontmatter: {
        title: string;
        date: string;
        author: string;
      };
    };
  };
};

export default function BlogPost({ data: { mdx } }: BlogPostQueryResult) {
  useAlternateBodyBackground('Offwhite');

  return (
    <>
      <SEO title={mdx.frontmatter.title} />
      <BlogHeader title={mdx.frontmatter.title} />
      <ContentBlock>
        <Text size="0.9rem" weight={300} color="accent">
          By {mdx.frontmatter.author}
          <br />
          Published {mdx.frontmatter.date} • {mdx.timeToRead} min read
        </Text>
      </ContentBlock>
      <MDXProvider
        components={{
          a: Link,
          blockquote: BlockQuoteMDXWrapper,
          code: CodeMDXWrapper,
          h1: H1,
          h2: H2,
          hr: HR,
          p: P,
          BlockQuote: BlockQuoteMDXWrapper,
          Figure: FigureMDXWrapper,
          Link,
          Text,
        }}
      >
        <Text container="div" color="dark">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Text>
      </MDXProvider>
      <BlogFooter />
    </>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "ll")
        author
      }
    }
  }
`;
