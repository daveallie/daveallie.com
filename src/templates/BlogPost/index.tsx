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
import H3 from '../../components/H3';
import { BlockQuoteMDXWrapper } from '../../components/BlockQuote';
import { CodeMDXWrapper } from '../../components/Code';
import InlineCode from '../../components/InlineCode';
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
        slug: string;
        author: string;
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

  return (
    <>
      <SEO
        title={mdx.frontmatter.title}
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
        slug
        author
        date(formatString: "ll")
        datestamp: date
        updatestamp: update_date
      }
    }
  }
`;
