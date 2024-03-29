import React, { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import AlertBox from '~/components/AlertBox';
import { BlockQuoteMDXWrapper } from '~/components/BlockQuote';
import { CodeMDXWrapper } from '~/components/Code';
import ContentBlock from '~/components/ContentBlock';
import { H1, H2, H3 } from '~/components/ContentHeader';
import { FigureMDXWrapper } from '~/components/Figure';
import HR from '~/components/HR';
import InlineCode from '~/components/InlineCode';
import Link from '~/components/Link';
import { Ol, Ul } from '~/components/List';
import P from '~/components/P';
import PageFooter from '~/components/PageFooter';
import PageHeader from '~/components/PageHeader';
import SEO from '~/components/SEO';
import Table from '~/components/Table';
import TagBadge from '~/components/TagBadge';
import Text from '~/components/Text';
import BlogSignupForm from '~/components/pages/blog/BlogSignupForm';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';

type BlogPostQueryResult = {
  mdx: {
    id: string;
    body: string & ReactNode;
    timeToRead: number;
    frontmatter: {
      title: string;
      description: string;
      imageUrl?: {
        childImageSharp: {
          fluid: {
            src: string;
          };
        };
      };
      author: string;
      slug: string;
      date: string;
      datestamp: string;
      updatestamp: string;
      tags: string[];
    };
  };
};

type BlogPostProps = {
  data: BlogPostQueryResult;
};

export default function BlogPost({ data: { mdx } }: BlogPostProps) {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();

  return (
    <>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        mailerLite
        path={`/${mdx.frontmatter.slug}`}
        imageUrl={mdx.frontmatter.imageUrl?.childImageSharp?.fluid?.src}
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
      <PageHeader title={mdx.frontmatter.title} />
      <ContentBlock>
        <Text size="0.9rem" weight={300} color="accent" container="div">
          By {mdx.frontmatter.author}
          <br />
          Published {mdx.frontmatter.date} • {mdx.timeToRead} min read
        </Text>
        <Text container="div">
          {mdx.frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
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
          table: Table,
          ul: Ul,
          ol: Ol,
          BlockQuote: BlockQuoteMDXWrapper,
          Figure: FigureMDXWrapper,
          AlertBox,
          Link,
          Text,
        }}
      >
        <Text container="div" color="dark">
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Text>
      </MDXProvider>
      <HR />
      <BlogSignupForm />
      <PageFooter />
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
        imageUrl {
          childImageSharp {
            fluid {
              src
            }
          }
        }
        author
        slug
        date(formatString: "ll")
        datestamp: date
        updatestamp: update_date
        tags
      }
    }
  }
`;
