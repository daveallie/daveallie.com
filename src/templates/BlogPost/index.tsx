import React, { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { BlockQuoteMDXWrapper } from '../../components/BlockQuote';
import { CodeMDXWrapper } from '../../components/Code';
import ContentBlock from '../../components/ContentBlock';
import { FigureMDXWrapper } from '../../components/Figure';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import HR from '../../components/HR';
import InlineCode from '../../components/InlineCode';
import Link from '../../components/Link';
import P from '../../components/P';
import SEO from '../../components/SEO';
import Text from '../../components/Text';
import BlogFooter from '../../components/pages/blog/BlogFooter';
import BlogHeader from '../../components/pages/blog/BlogHeader';
import useAlternateBodyBackground from '../../hooks/useAlternateBodyBackground';
import usePageTracking from '../../hooks/usePageTracking';

type BlogPostQueryResult = {
  data: {
    mdx: {
      id: string;
      body: string & ReactNode;
      timeToRead: number;
      frontmatter: {
        title: string;
        description: string;
        author: string;
        slug: string;
        date: string;
        datestamp: string;
        updatestamp: string;
      };
    };
  };
};

const ListElement = ({ ordered }: { ordered: boolean }) => ({
  children,
}: {
  children: ReactNode;
}) => (
  <P negTopMargin>
    {ordered && <ol>{children}</ol>}
    {!ordered && <ul>{children}</ul>}
  </P>
);

export default function BlogPost({ data: { mdx } }: BlogPostQueryResult) {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();

  return (
    <>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        path={`/${mdx.frontmatter.slug}`}
        meta={[
          {
            property: 'article:published_time',
            content: mdx.frontmatter.datestamp,
          },
          {
            property: 'article:modified_time',
            content: mdx.frontmatter.updatestamp,
          },
          {
            property: 'article:author',
            content: mdx.frontmatter.author,
          },
        ]}
      />
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
          inlineCode: InlineCode,
          h1: H1,
          h2: H2,
          h3: H3,
          hr: HR,
          p: P,
          ul: ListElement({ ordered: false }),
          ol: ListElement({ ordered: true }),
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
        description
        author
        slug
        date(formatString: "ll")
        datestamp: date
        updatestamp: update_date
      }
    }
  }
`;
