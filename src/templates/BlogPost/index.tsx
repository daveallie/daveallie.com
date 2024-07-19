import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { graphql } from 'gatsby';
import AlertBox from '~/components/AlertBox';
import { BlockQuoteMDXWrapper } from '~/components/BlockQuote';
import { CodeMDXWrapper } from '~/components/Code';
import ContentBlock from '~/components/ContentBlock';
import { H1, H2, H3 } from '~/components/ContentHeader';
import { FigureMDXWrapper } from '~/components/Figure';
import HR from '~/components/HR';
import Link from '~/components/Link';
import { Ol, Ul } from '~/components/List';
import P from '~/components/P';
import PageFooter from '~/components/PageFooter';
import PageHeader from '~/components/PageHeader';
import BlogSignupForm from '~/components/pages/blog/BlogSignupForm';
import SEO from '~/components/SEO';
import Table from '~/components/Table';
import TagBadge from '~/components/TagBadge';
import Text from '~/components/Text';
import Tooltip from '~/components/Tooltip';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';

const components = {
  a: Link,
  blockquote: BlockQuoteMDXWrapper,
  code: CodeMDXWrapper,
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
  ContentBlock,
  Tooltip,
};

// There are currently issues with including types in this file

// type BlogPostQueryResult = {
//   mdx: {
//     id: string;
//     fields: {
//       timeToRead: {
//         minutes: number;
//       };
//     };
//     frontmatter: {
//       title: string;
//       description: string;
//       imageUrl?: {
//         publicURL: string;
//       };
//       author: string;
//       slug: string;
//       date: string;
//       datestamp: string;
//       updatestamp: string;
//       tags: string[];
//     };
//   };
// };
//
// type BlogPostProps = {
//   data: BlogPostQueryResult;
//   children: ReactNode;
// };

// @ts-ignore
export default function BlogPost({ data: { mdx }, children }) {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();

  const minRead = Math.round(mdx.fields.timeToRead.minutes);

  return (
    <>
      <SEO
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        mailerLite
        path={`/${mdx.frontmatter.slug}`}
        imageUrl={mdx.frontmatter.imageUrl?.publicURL}
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
          Published {mdx.frontmatter.date} • {minRead} min read
        </Text>
        {mdx.frontmatter.tags ? (
          <Text container="div">
            {/* @ts-ignore */}
            {mdx.frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </Text>
        ) : null}
      </ContentBlock>
      {/* @ts-ignore */}
      <MDXProvider components={components}>
        <Text container="div" color="dark">
          {children}
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
      fields {
        timeToRead {
          minutes
        }
      }
      frontmatter {
        title
        description
        imageUrl {
          publicURL
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
