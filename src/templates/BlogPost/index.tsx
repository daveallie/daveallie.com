import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Link from '../../components/Link';
import Text from '../../components/Text';
import HR from '../../components/HR';
import SEO from '../../components/seo';
import { FigureMDXWrapper } from '../../components/Figure';
import useAlternateBodyBackground from '../../hooks/useAlternateBodyBackground';
import ContentBlock from '../../components/ContentBlock';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import { BlockQuoteMDXWrapper } from '../../components/BlockQuote';
import { CodeMDXWrapper } from '../../components/Code';
import P from '../../components/P';
import * as styles from './styles.module.scss';

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
      <div className={styles.blogHeader}>
        <Text weight={500} color="headingLight" size="1.6rem">
          <Link href="/" color="ultraLight" gatsby underline={false}>
            Dave Allie
          </Link>
        </Text>
      </div>
      <div className={styles.title}>
        <H1>{mdx.frontmatter.title}</H1>
      </div>
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
